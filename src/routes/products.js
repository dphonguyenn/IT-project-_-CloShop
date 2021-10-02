var express = require('express');
const router = express.Router();
const ProductsController = require('../app/controllers/ProductsController');
router.get('/:id',ProductsController.show);
module.exports = router;