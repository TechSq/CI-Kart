const router = require("express").Router();
const controller = require("./controller");

router.post("/", controller.customerRegistration);
router.post("/social/:provider", controller.socialLogin);
router.post("/addtocart/:itemId", controller.addToCartNewOrder);
router.post("/addtocart/:orderId/item/:itemId", controller.addToCartWithOrder);
router.delete(
  "/cart/:orderId/item/:itemId",
  controller.removeItemCartWithOrder
);
router.get("/getorder/:orderId", controller.getOrder);

module.exports = router;
