const router = require('express').Router();
const controller = require('./controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// router.post('/read_csv_file', upload.single('file'), controller.readCsvFile);
router.post('/add_subcategory', controller.addSubCategory);
router.get('/get_subcategories', controller.getSubCategories);

module.exports = router;