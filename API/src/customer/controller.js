const { Vendors, Users, Customer, Coupons, WishList } = require("../../models");
const bcrypt = require("bcrypt");
const baseMap = require("../../shared/basemap");
const { getUUID } = require("../../shared/utils");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const userController = require("../user/controller");
const jwt = require("jsonwebtoken");
const Orders = require("../../models/orders");
const { OrderStatus } = require("../../shared/constant-values");
const { cartService, orderService, wishListService } = require("../../service");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sabarish.i2sts@gmail.com",
    pass: "lbzoldxxbdzhzxln",
  },
});
class CustomerController {
  async customerRegistration(req, res) {
    try {
      const { email, phoneNumber, password } = req.body;
      if (password && password.length > 3) {
        const existingUser = await Users.findOne({
          $and: [{ $or: [{ phoneNumber }, { email }] }, { userType: "Vendor" }],
        });
        if (existingUser) {
          baseMap.error(req, res, "Email or phone already exists");
        } else {
          const newUser = await this.register(req.body).data;

          const mailOptions = {
            from: "sabarish.i2sts@gmail.com",
            to: "sabarish.i2sts@gmail.com",
            subject: "Customer Registration",
            text: `you have received a Customer registration request by ${newUser?.userName}`,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log("Error occurred:", error);
            } else {
              console.log("Email sent:", info.response);
            }
          });

          baseMap.post(req, res, newUser);
        }
      } else {
        baseMap.error(req, res, "Password must be atleast 4 characters");
      }
    } catch (error) {
      console.error("Error signing up vendor:", error);
      baseMap.error(req, res, error);
    }
  }

  async socialLogin(req, res, next) {
    console.log("Req", req.body);
    if (req.params.provider === "google") {
      const { clientId, credential, select_by } = req.body;
      if (credential) {
        const googleData = jwt.decode(credential);
        console.log("googleData", googleData);
        if (googleData.email) {
          const user = await userController.findUser(
            googleData.email,
            "Customer"
          );
          if (user) {
            await Users.findOneAndUpdate(
              { _id: user._id },
              { loginProvider: "GOOGLE", picture: googleData.picture }
            );
            const data = await userController.generateToken(req, res, user);
            return data;
          } else {
            const regData = {
              firstName: googleData.given_name,
              lastName: googleData.family_name,
              userType: "Customer",
              userUuid: getUUID(),
              userName: googleData.given_name + " " + googleData.family_name,
              email: googleData.email,
              isActive: true,
              isDeleted: false,
              loginProvider: "GOOGLE",
              dob: "not-provided",
              password: "customer",
              picture: googleData.picture,
            };
            console.log("regData", regData);
            const regUser = await userController.register(regData);
            console.log("regUser", regUser);
            const [data] = await userController.generateToken(
              req,
              res,
              regUser
            );

            return data;
          }
        }
      }
    } else if (req.params.provider === "facebook") {
      const { first_name, last_name, picture, email } = req.body;
      if (email) {
        const user = await userController.findUser(email, "Customer");
        if (user) {
          await Users.findOneAndUpdate(
            { _id: user._id },
            { loginProvider: "FACEBOOK", picture: picture?.data?.url || "" }
          );
          const data = await userController.generateToken(req, res, user);
          return data;
        } else {
          const regData = {
            firstName: first_name,
            lastName: last_name,
            userType: "Customer",
            userUuid: getUUID(),
            userName: first_name + " " + last_name,
            email: email,
            isActive: true,
            isDeleted: false,
            loginProvider: "FACEBOOK",
            dob: "not-provided",
            password: "customer",
            picture: picture?.data?.url || "",
          };
          console.log("regData", regData);
          const regUser = await userController.register(regData);
          console.log("regUser", regUser);
          const [data] = await userController.generateToken(req, res, regUser);

          return data;
        }
      }
    } else {
      baseMap.customStatus(req, res, {
        message: "Invalid Provider",
        success: false,
      });
    }
  }

  async addToCartNewOrder(req, res, next) {
    try {
      console.log("Req", req);
      const { itemId } = req.params;
      const { quantity } = req.query;
      const session = await mongoose.startSession();
      session.startTransaction();

      const orderUuid = getUUID();

      const newOrder = new Orders({
        orderUuid: orderUuid,
        customer: {},
        orderItems: [],
        orderStatus: OrderStatus.InCart,
      });
      await newOrder.save();

      const response = await cartService.addItemToCart(
        orderUuid,
        itemId,
        parseInt(quantity)
      );

      await session.commitTransaction();
      session.endSession();

      baseMap.customStatus(
        req,
        res,
        { success: response.success, message: response.message },
        response.data
      );
    } catch (error) {
      console.error("Error signing up vendor:", error);
      baseMap.error(req, res, error);
    }
  }

  async addToCartWithOrder(req, res, next) {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      const { orderId, itemId } = req.params;
      const { quantity } = req.query;

      const response = await cartService.addItemToCart(
        orderId,
        itemId,
        quantity
      );

      await session.commitTransaction();
      session.endSession();

      baseMap.customStatus(
        req,
        res,
        { success: response.success, message: response.message },
        response.data
      );
    } catch (error) {
      console.error("Error signing up vendor:", error);
      baseMap.error(req, res, error);
    }
  }

  async addOrUpdateCart(req, res, next) {
    try {
      const { productId } = req.params;
      const { quantity } = req.query;
      if (req.user) {
        const order = await Orders.findOne({
          "customer.id": req.user._id,
          orderStatus: OrderStatus.InCart,
        });
        if (order) {
          const response = await cartService.addItemToCart(
            order.orderUuid,
            productId,
            quantity
          );
          baseMap.customStatus(
            req,
            res,
            { success: response.success, message: response.message },
            response.data
          );
        } else {
          const orderUuid = getUUID();

          const authCustomer = req.user;

          const newOrder = new Orders({
            orderUuid: orderUuid,
            customer: {
              id: authCustomer._id,
              userUuid: authCustomer.userUuid,
              firstName: authCustomer.firstName,
              lastName: authCustomer.lastName,
              email: authCustomer.email,
              phoneNumber: authCustomer.phoneNumber,
            },
            orderItems: [],
            orderStatus: OrderStatus.InCart,
          });
          await newOrder.save();
          const response = await cartService.addItemToCart(
            orderUuid,
            productId,
            quantity
          );
          baseMap.customStatus(
            req,
            res,
            { success: response.success, message: response.message },
            response.data
          );
        }
      } else {
        baseMap.customStatus(
          req,
          res,
          { success: false, message: "Requires Customer login" },
          {}
        );
      }
    } catch (error) {
      console.error("Error signing up vendor:", error);
      baseMap.error(req, res, error);
    }
  }

  async removeItemFromCart(req, res, next) {
    try {
      const { productId } = req.params;
      if (req.user) {
        const order = await Orders.findOne({
          "customer.id": req.user._id,
          orderStatus: OrderStatus.InCart,
        });
        const response = await cartService.removeItemFromCart(
          order.orderUuid,
          productId
        );
        baseMap.customStatus(
          req,
          res,
          { success: response.success, message: response.message },
          response.data
        );
      } else {
        baseMap.customStatus(
          req,
          res,
          { success: false, message: "Requires Customer login" },
          {}
        );
      }
    } catch (error) {
      console.error("Error signing up vendor:", error);
      baseMap.error(req, res, error);
    }
  }

  async placeMyOrder(req, res, next) {
    try {
      if (req.user) {
        const order = await Orders.findOne({
          "customer.id": req.user._id,
          orderStatus: OrderStatus.InCart,
        });

        const response = await orderService.placeOrder(
          order.orderUuid,
          req.user
        );
        baseMap.customStatus(
          req,
          res,
          { status: response.status, message: response.message },
          response.data
        );
      } else {
        baseMap.customStatus(
          req,
          res,
          { success: false, message: "Requires Customer login" },
          {}
        );
      }
    } catch (error) {
      console.error("Error placeOrder:", error);
      baseMap.error(req, res, error);
    }
  }

  async getMyOrders(req, res, next) {
    try {
      if (req.user) {
        const order = await Orders.findOne({
          "customer.id": req.user._id,
          orderStatus: OrderStatus.InCart,
        });
        baseMap.customStatus(
          req,
          res,
          { success: true, message: "Order details" },
          order || {}
        );
      } else {
        baseMap.customStatus(
          req,
          res,
          { success: false, message: "Requires Customer login" },
          {}
        );
      }
    } catch (error) {
      console.error("Error signing up vendor:", error);
      baseMap.error(req, res, error);
    }
  }

  async removeItemCartWithOrder(req, res, next) {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      const { orderId, itemId } = req.params;

      const response = await cartService.removeItemFromCart(orderId, itemId);

      await session.commitTransaction();
      session.endSession();

      baseMap.customStatus(
        req,
        res,
        { success: response.success, message: response.message },
        response.data
      );
    } catch (error) {
      console.error("Error signing up vendor:", error);
      baseMap.error(req, res, error);
    }
  }

  async getOrder(req, res, next) {
    try {
      const { orderId } = req.params;

      const order = await Orders.findOne({ orderUuid: orderId });

      baseMap.customStatus(
        req,
        res,
        { status: true, message: "Order details" },
        order
      );
    } catch (error) {
      console.error("Error signing up vendor:", error);
      baseMap.error(req, res, error);
    }
  }

  async applyCouponToOrder(req, res, next) {
    try {
      const { orderId, couponCode } = req.params;

      //CHeck the coupon is Used or Not and Valid coupon

      const coupon = await Coupons.findOne({ couponCode });

      if (coupon && !coupon.isUsed) {
        const response = await cartService.applySelectedCoupon(orderId, coupon);
        baseMap.customStatus(
          req,
          res,
          { success: response.success, message: response.message },
          response.data
        );
      } else {
        baseMap.customStatus(
          req,
          res,
          { success: false, message: "Invalid coupon or Coupon already used" },
          {}
        );
      }
    } catch (error) {
      console.error("Error signing up vendor:", error);
      baseMap.error(req, res, error);
    }
  }

  async placeOrder(req, res, next) {
    try {
      if (req.user) {
        const { orderId } = req.params;

        const response = await orderService.placeOrder(orderId, req.user);
        baseMap.customStatus(
          req,
          res,
          { success: response.success, message: response.message },
          response.data
        );
      } else {
        baseMap.customStatus(
          req,
          res,
          { success: false, message: "Requires Customer login" },
          {}
        );
      }
    } catch (error) {
      console.error("Error placeOrder:", error);
      baseMap.error(req, res, error);
    }
  }

  async applyCouponToCart(req, res, next) {
    try {
      const { couponCode } = req.params;

      if (req.user) {
        const order = await Orders.findOne({
          "customer.id": req.user._id,
          orderStatus: OrderStatus.InCart,
        });

        //CHeck the coupon is Used or Not and Valid coupon

        const coupon = await Coupons.findOne({ couponCode });

        if (coupon && !coupon.isUsed) {
          const response = await cartService.applySelectedCoupon(
            order.orderUuid,
            coupon
          );
          baseMap.customStatus(
            req,
            res,
            { success: response.success, message: response.message },
            response.data
          );
        } else {
          baseMap.customStatus(
            req,
            res,
            {
              success: false,
              message: "Invalid coupon or Coupon already used",
            },
            {}
          );
        }
      } else {
        baseMap.customStatus(
          req,
          res,
          { success: false, message: "Requires Customer login" },
          {}
        );
      }
    } catch (error) {
      console.error("Error signing up vendor:", error);
      baseMap.error(req, res, error);
    }
  }

  async addToWishList(req, res, next) {
    try {
      if (req.user) {
        const { productId } = req.params;
        const response = await wishListService.addToWishList(
          req.user._id,
          productId
        );
        baseMap.customStatus(
          req,
          res,
          { success: response.success, message: response.message },
          response.data
        );
      } else {
        baseMap.customStatus(
          req,
          res,
          { success: false, message: "Requires Customer login" },
          {}
        );
      }
    } catch (err) {
      console.error("Error placeOrder:", err);
      baseMap.error(req, res, err);
    }
  }

  async removeFromWishList(req, res, next) {
    try {
      if (req.user) {
        const { productId } = req.params;
        const response = await wishListService.removeFromWishList(
          req.user._id,
          productId
        );
        baseMap.customStatus(
          req,
          res,
          { success: response.success, message: response.message },
          response.data
        );
      } else {
        baseMap.customStatus(
          req,
          res,
          { success: false, message: "Requires Customer login" },
          {}
        );
      }
    } catch (err) {
      console.error("Error placeOrder:", err);
      baseMap.error(req, res, err);
    }
  }

  async getAllWishList(req, res, next) {
    try {
      if (req.user) {
        const wishlist = await WishList.findOne({
          customer: req.user._id,
        }).populate("wishListItems");

        const dbData = wishlist?.wishListItems || [];

        let resData = [];
        if (dbData && dbData.length > 0) {
          resData = dbData;
        }
        resData = resData.map((a, index) => {
          return {
            ...a._doc,
            sno: index + 1,
          };
        });

        baseMap.customStatus(
          req,
          res,
          { success: true, message: "Wishlist details" },
          resData
        );
      } else {
        baseMap.customStatus(
          req,
          res,
          { success: false, message: "Requires Customer login" },
          {}
        );
      }
    } catch (error) {
      console.error("Error signing up vendor:", error);
      baseMap.error(req, res, error);
    }
  }
}

module.exports = new CustomerController();
