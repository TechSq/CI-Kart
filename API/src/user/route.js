const router = require("express").Router();
const controller = require("./controller");

router.post("/register", controller.userRegistration);
router.post("/login", controller.login);
router.post("/send-otp", controller.sendOtp);
router.post("/verify-otp", controller.verifyOtp);
router.post("/reset-password", controller.resetPassword);
router.post("/forgot-password", controller.forgotPassword);
router.get("/", controller.userList);
router.get("/selected/:customerId", controller.selectedUser);
router.get("/user-profile", controller.userProfile);
router.post("/profile/upload", controller.profileUpload);

module.exports = router;
