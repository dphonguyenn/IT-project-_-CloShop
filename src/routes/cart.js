const express = require('express');
const router = express.Router();
const CartController = require('../app/controllers/CartController');
router.get('/', CartController.showCartPage);
module.exports = router;