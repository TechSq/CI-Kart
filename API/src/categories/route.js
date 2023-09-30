const router = require("express").Router();
const controller = require("./controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// router.post('/read_csv_file', upload.single('file'), controller.readCsvFile);

router.post("/add_category", controller.addCategory);
router.get("/sample_categories", controller.getSampleCategories);
router.get("/get_categories", controller.getCategories);
module.exports = router;
