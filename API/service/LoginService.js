const jwt = require("jsonwebtoken");
const { Users, Vendors, Customer } = require("../models");
const baseMap = require("../shared/basemap");
const {
    application: { jwtKey },
  } = require("../config/config.json");


async function generateToken(req, res, user) {
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
  
  module.exports = { generateToken };
  