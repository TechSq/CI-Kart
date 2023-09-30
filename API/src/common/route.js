const router = require("express").Router();
const controller = require("./controller");

router.post("/upload/s3/:folder", controller.uploadToS3);
router.get("/attribute/getAll", controller.getAllAttributes);
router.post("/attribute/addAddtributeGroup", controller.addAttributeGroup);
router.get("/categories", controller.getAllCategories);
router.get("/subcategories", controller.getAllSubCategories);

module.exports = router;
