const { Vendors, Users } = require("../../models");
const bcrypt = require("bcrypt");
const baseMap = require("../../shared/basemap");
const { getUUID } = require("../../shared/utils");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sabarish.i2sts@gmail.com",
    pass: "lbzoldxxbdzhzxln",
  },
});
class VendorController {
  async vendorRegistration(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        PANNumber,
        AADHARNumber,
        bankName,
        bankAccountNumber,
        IFSCCode,
        dob,
        gender,
        legalName,
        address1,
        address2,
        city,
        district,
        state,
        pincode,
        gstn,
      } = req.body;
      if (password && password.length > 3) {
        const existingUser = await Users.findOne({
          $and: [{ $or: [{ phoneNumber }, { email }] }, { userType: "Vendor" }],
        });
        if (existingUser) {
          baseMap.error(req, res, "Email or phone already exists");
        } else {
          const session = await mongoose.startSession();
          session.startTransaction();
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = new Users({
            firstName,
            lastName,
            password: hashedPassword,
            userType: "Vendor",
            userUuid: getUUID(),
            dob,
            gender,
            userName: firstName + " " + lastName,
            email,
            phoneNumber,
            isActive: true,
            isDeleted: false,
          });
          const newVendor = new Vendors({
            ...req.body,
            firstName,
            lastName,
            PANNumber,
            AADHARNumber,
            ownerUuid: newUser.userUuid,
            vendorUuid: getUUID(),
            userName: firstName + " " + lastName,
            email,
            isActive: false,
            isDeleted: false,
            gender,
            dob,
            phoneNumber,
            IFSCCode,
            bankName,
            bankAccountNumber,
            legalName,
            address1,
            address2,
            city,
            district,
            state,
            pincode,
            gstn,
          });
          await newVendor.save();
          await newUser.save();
          await session.commitTransaction();
          session.endSession();
          const mailOptions = {
            from: "sabarish.i2sts@gmail.com",
            to: "sabarish.i2sts@gmail.com",
            subject: "Vendor Registration",
            text: `you have received a Vendor registration request by ${newUser?.userName}`,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log("Error occurred:", error);
            } else {
              console.log("Email sent:", info.response);
            }
          });

          baseMap.post(req, res, newVendor);
        }
      } else {
        baseMap.error(req, res, "Password must be atleast 4 characters");
      }
    } catch (error) {
      console.error("Error signing up vendor:", error);
      baseMap.error(req, res, error);
    }
  }

  async vendorList(req, res) {
    try {
      const users = await Vendors.find();
      baseMap.getAll(req, res, users);
    } catch (error) {
      console.error("Error:", error);
      baseMap.error(req, res, error);
    }
  }

  async vendorStatus(req, res) {
    try {
      const { status, vendorUuid } = req.body;
      const updatedData = {
        status: status,
        isActive: status == "Approved" ? true : false,
      };
      const vendor = await Vendors.findOneAndUpdate(
        { vendorUuid },
        { $set: updatedData },
        { new: true }
      );
      const mailOptions = {
        from: "sabarish.i2sts@gmail.com",
        to: vendor.email,
        subject: `Vendor Request ${status}`,
        text:
          status == "Approved"
            ? "Your vendor request has been approved"
            : "We are Sorry, your vendor request has been Declined",
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error occurred:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
      baseMap.put(req, res, vendor);
    } catch (error) {
      console.error("Error:", error);
      baseMap.error(req, res, error);
    }
  }
}

module.exports = new VendorController();
