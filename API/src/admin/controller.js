const { Attribute, Coupons } = require("../../models");
const baseMap = require("../../shared/basemap");
const couponService = require("../../service/CouponService");
const s3FileUpload = require("../../shared/s3FileUpload");

class CommonController {
  async uploadToS3(req, res) {
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

  async getAllCoupons(req, res) {
    try {
      const coupons = await Coupons.find();
      let resData = [];
      if (coupons && coupons.length > 0) {
        resData = coupons;
      }
      resData = resData.map((a, index) => {
        return {
          ...a._doc,
          sno: index + 1,
        };
      });
      baseMap.getAll(req, res, resData);
    } catch (error) {
      console.error("Error signing up vendor:", error);
      baseMap.error(req, res, error);
    }
  }

  async addCoupon(req, res) {
    try {
      const { couponName, discountType, discountValue } = req.body;

      const allowedValues = ["Percentage", "Amount"];

      if (allowedValues.includes(discountType)) {
        if (discountType === "Percentage") {
          console.log(discountValue, discountValue < 0 || discountValue > 100);
          if (discountValue < 0 || discountValue > 100) {
            baseMap.customStatus(req, res, {
              message: "Invalid Discount Percentage",
              success: false,
            });
          }
        }

        const existingCoupons = await Coupons.find();

        const existingCouponCodes = existingCoupons.map((c) => c.couponCode);

        const uniqueCode = couponService.generateUniqueCouponCode(
          existingCouponCodes,
          14
        );

        const newCoupon = new Coupons({
          couponName,
          discountType,
          discountValue,
          couponCode: uniqueCode,
          isUsed: false,
        });
        await newCoupon.save();
        baseMap.post(req, res, newCoupon);
      } else {
        baseMap.customStatus(req, res, {
          message: "Invalid Discount Type",
          success: false,
        });
      }
    } catch (error) {
      console.error("Error signing up vendor:", error);
      baseMap.error(req, res, error);
    }
  }
}

module.exports = new CommonController();
