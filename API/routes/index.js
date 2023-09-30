const router = require("express").Router();
const UserRoute = require("../src/user/route");
const AdminRoute = require("../src/admin/route");
const CustomerRoute = require("../src/customer/route");
const CustomerSecureRoute = require("../src/customer/secureroute");
const VendorRoute = require("../src/vendor/route");
const CategoriesRoute = require("../src/categories/route");
const productRoute = require("../src/products/route");
const SubCategoriesRoute = require("../src/subcategories/route");
const commonRoute = require("../src/common/route");

const routes = (passport) => {
  const authenticate = passport.authenticate("jwt", { session: false });
  router.use("/users", UserRoute);
  router.use("/admin", AdminRoute);
  router.use("/customers", CustomerRoute);
  router.use("/customers/secure", authenticate, CustomerSecureRoute);
  router.use("/categories", authenticate, CategoriesRoute);
  router.use("/subcategories", SubCategoriesRoute);
  router.use("/vendors", VendorRoute);
  router.use("/products", productRoute);
  router.use("/common", commonRoute);
  router.use("/health-check", (req, res) =>
    res.status(200).send({ success: true, message: "VGM Service is Running" })
  );
  return router;
};

module.exports = routes;
