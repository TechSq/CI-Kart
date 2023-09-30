const { Users, Vendors, Customer } = require("../../models");
const bcrypt = require("bcrypt");
const baseMap = require("../../shared/basemap");
const { getUUID } = require("../../shared/utils");
const jwt = require("jsonwebtoken");
const {
  application: { jwtKey },
} = require("../../config/config.json");
const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");
const s3FileUpload = require("../../shared/s3FileUpload");
const mongoose = require("mongoose");
const loginService = require("../../service/LoginService");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sabarish.i2sts@gmail.com",
    pass: "lbzoldxxbdzhzxln",
  },
});
class UserController {
  async userRegistration(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        dob,
        gender,
        userType,
      } = req.body;
      if (password && password.length > 3) {
        const existingUser = await Users.findOne({
          $and: [{ $or: [{ phoneNumber }, { email }] }, { userType: userType }],
        });
        if (existingUser) {
          baseMap.error(req, res, "Email or phone already exists");
        } else {
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = new Users({
            firstName,
            lastName,
            dob,
            gender,
            userType: userType,
            userUuid: getUUID(),
            userName: firstName + " " + lastName,
            email,
            phoneNumber,
            isActive: true,
            password: hashedPassword,
          });

          await newUser.save();

          baseMap.post(req, res, newUser);
        }
      } else {
        baseMap.error(req, res, "Password must be atleast 4 characters");
      }
    } catch (error) {
      console.error("Error signing up user:", error);
      baseMap.error(req, res, error);
    }
  }
  async login(req, res, next) {
    try {
      console.log("Req", req.body);
      const { emailOrPhoneNumber, password, userType } = req.body;
      if (password && password.length > 3) {
        const user = await Users.findOne({
          $or: [
            { email: emailOrPhoneNumber },
            { phoneNumber: emailOrPhoneNumber },
          ],
          userType: userType,
        });
        if (!user) {
          return res
            .status(404)
            .json({ success: false, message: "User Does not exists" });
        } else {
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return res
              .status(401)
              .json({ success: false, message: "Invalid Password" });
          } else {
            console.log(user);
            return await loginService.generateToken(req, res, user);
          }
        }
      } else {
        baseMap.error(req, res, "Password must be atleast 4 characters");
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async findUser(emailOrPhoneNumber, userType = "Customer") {
    const user = await Users.findOne({
      $or: [{ email: emailOrPhoneNumber }, { phoneNumber: emailOrPhoneNumber }],
      userType: userType,
    });
    return user;
  }

  async generateToken(req, res, user) {
    const payload = {
      userName: user.userName,
      id: user._id,
    };
    const token = jwt.sign(payload, jwtKey);
    if (user?.userType != "Vendor") {
      return baseMap.customStatus(
        req,
        res,
        {
          success: true,
          message: "Login Successfull",
        },
        { token, user }
      );
    } else if (user?.userType === "Customer") {
      const customer = await Customer.findOne({
        userUuid: user?.userUuid,
      });
      if (customer.isActive) {
        return baseMap.customStatus(
          req,
          res,
          {
            success: true,
            message: "Login Successfull",
          },
          { token, customer }
        );
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Customer is not Active" });
      }
    } else {
      const vendor = await Vendors.findOne({
        ownerUuid: user?.userUuid,
      });
      if (vendor.status == "Approved") {
        baseMap.customStatus(
          req,
          res,
          {
            success: true,
            message: "Login Successfull",
          },
          { token, vendor }
        );
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Vendor is not Active" });
      }
    }
  }

  async register(customerData) {
    console.log("register -- payload", customerData);
    const existingUser = await Users.findOne({
      email: customerData.email,
      userType: "Customer",
    });
    console.log("existingUser", existingUser);
    if (existingUser) {
      return {
        success: false,
        data: existingUser,
        message: "Email or phone already exists",
      };
    } else {
      const session = await mongoose.startSession();
      session.startTransaction();
      let hashedPassword = "";
      if (customerData.password && customerData.password !== "") {
        hashedPassword = await bcrypt.hash(customerData.password, 10);
      }
      const userUUID = getUUID();
      const newUser = new Users({
        ...customerData,
        password: hashedPassword,
        userType: "Customer",
        userUuid: userUUID,
        userName: customerData.firstName + " " + customerData.lastName,
        email: customerData.email,
        isActive: true,
        isDeleted: false,
      });

      const newCustomer = new Customer({
        ...customerData,
        userUuid: userUUID,
        userName: customerData.firstName + " " + customerData.lastName,
        email: customerData.email,
        isActive: true,
        isDeleted: false,
      });
      await newUser.save();
      await newCustomer.save();
      await session.commitTransaction();
      session.endSession();
      // const mailOptions = {
      //   from: "sabarish.i2sts@gmail.com",
      //   to: "sabarish.i2sts@gmail.com",
      //   subject: "Vendor Registration",
      //   text: `you have received a Customer registration request by ${newUser?.userName}`,
      // };
      // transporter.sendMail(mailOptions, (error, info) => {
      //   if (error) {
      //     console.log("Error occurred:", error);
      //   } else {
      //     console.log("Email sent:", info.response);
      //   }
      // });

      return {
        success: true,
        data: newUser,
        message: "Customer Registered Successfully",
      };
    }
  }

  async userList(req, res) {
    try {
      const users = await Users.find({ userType: "User" });
      baseMap.getAll(req, res, users);
    } catch (error) {
      console.error("Error:", error);
      baseMap.error(req, res, error);
    }
  }

  async selectedUser(req, res) {
    try {
      const { customerId } = req.params;

      const users = await Users.findOne({
        _id: new mongoose.Types.ObjectId(customerId),
      });
      baseMap.get(req, res, users);
    } catch (error) {
      console.error("Error:", error);
      baseMap.error(req, res, error);
    }
  }

  async sendOtp(req, res) {
    try {
      const { email, userType } = req.body;
      const user = await Users.findOne({ email: email, userType: userType });
      if (user) {
        const otp = speakeasy.totp({
          secret: speakeasy.generateSecret({ length: 20 }).base32,
          digits: 6,
        });
        await Users.findOneAndUpdate({ _id: user.id }, { otp });
        const mailOptions = {
          from: "sabarish.i2sts@gmail.com",
          to: user.email,
          subject: "OTP for reset password",
          text: `Your Otp  for password reset is ${otp}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("Error occurred:", error);
          } else {
            console.log("Email sent:", info.response);
          }
        });
      }
      baseMap.customStatus(
        req,
        res,
        { status: true, message: "Otp sent succeussfully" },
        user
      );
    } catch (error) {
      console.error("Error:", error);
      baseMap.error(req, res, error);
    }
  }
  async verifyOtp(req, res) {
    try {
      const { id, otp } = req.body;
      const user = await Users.findOne({ _id: id });
      if (user.otp == otp) {
        baseMap.customStatus(req, res, {
          status: true,
          message: "Otp verified succeussfully",
        });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Otp does not match" });
      }
    } catch (error) {
      console.error("Error:", error);
      baseMap.error(req, res, error);
    }
  }
  async resetPassword(req, res) {
    try {
      const { id, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await Users.findOneAndUpdate(
        { _id: id },
        { password: hashedPassword }
      );
      return res
        .status(200)
        .json({ success: true, message: "Password changed successfully" });
    } catch (error) {
      console.error("Error:", error);
      baseMap.error(req, res, error);
    }
  }

  async forgotPassword(req, res) {
    try {
      const { id, otp, password } = req.body;
      const user = await Users.findOne({ _id: id });
      if (user.otp == otp) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userUpdated = await Users.findOneAndUpdate(
          { _id: id },
          { password: hashedPassword }
        );
        return res.status(200).json({
          success: true,
          message: "Password changed successfully",
          userUpdated,
        });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Otp does not match" });
      }
    } catch (error) {
      console.error("Error:", error);
      baseMap.error(req, res, error);
    }
  }
  async userProfile(req, res) {
    try {
      const { id } = req.query;
      const user = await Users.findOne({ _id: id });
      baseMap.get(req, res, user);
    } catch (error) {
      console.error("Error:", error);
      baseMap.error(req, res, error);
    }
  }

  async profileUpload(req, res) {
    await s3FileUpload(req)
      .then((data) => {
        console.log("IData", data);
        res.status(200).json({
          message: "Success",
          data,
        });
      })
      .catch((error) => {
        console.log("ErrorUpload", error);
        res.status(400).json({
          message: "An error occurred.",
          error,
        });
      });
  }
}

module.exports = new UserController();
