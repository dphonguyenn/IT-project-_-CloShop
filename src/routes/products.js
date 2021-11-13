const express = require('express');
const router = express.Router();
const ProductsController = require('../app/controllers/ProductsController');
router.get('/add-to-cart/:id', ProductsController.addToCart);
router.get('/subtract-to-cart/:id', ProductsController.subtractToCart);
router.get('/remove-to-cart/:id', ProductsController.removeToCart);
router.get('/:id',ProductsController.show);
module.exports = router;