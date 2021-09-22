var express = require('express');
const router = express.Router();
const ProductsController = require('../app/controllers/ProductsController');
router.get('/:product_id',ProductsController.show);
module.exports = router;