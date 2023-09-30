const router = require('express').Router();
const controller = require('./controller');

router.post('/add_product', controller.addProduct);
router.post('/add_product_by_vendor', controller.addProductByVendor);
router.get('/list_products', controller.listProducts);
router.get('/list_requested_products', controller.listRequestedProducts);
router.put('/update_status', controller.updateProduct);

module.exports = router;