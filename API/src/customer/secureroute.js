const router = require("express").Router();
const controller = require("./controller");

router.post("/cart/placeorder/:orderId", controller.placeOrder);
router.post("/wishlist/:productId", controller.addToWishList);
router.delete("/wishlist/:productId", controller.removeFromWishList);
router.get("/wishlist", controller.getAllWishList);
router.get("/cart", controller.getMyOrders);
router.post("/cart/placeorder", controller.placeMyOrder);
router.post("/cart/apply-coupon/:couponCode", controller.applyCouponToCart);
router.post("/cart/:productId", controller.addOrUpdateCart);
router.delete("/cart/:productId", controller.removeItemFromCart);

module.exports = router;
