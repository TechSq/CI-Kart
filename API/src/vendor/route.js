const router = require('express').Router();
const controller = require('./controller');

router.post('/', controller.vendorRegistration);
router.get('/', controller.vendorList);
router.put('/status', controller.vendorStatus);

module.exports = router;