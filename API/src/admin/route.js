const router = require("express").Router();
const controller = require("./controller");

router.post("/upload/s3/:folder", controller.uploadToS3);
router.get("/coupon/getall", controller.getAllCoupons);
router.post("/coupon/addcoupon", controller.addCoupon);

module.exports = router;
