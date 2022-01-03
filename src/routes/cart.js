const express = require('express');
const router = express.Router();
const CartController = require('../app/controllers/CartController');
router.get('/checkout', CartController.showCheckoutPage);
router.post('/confirm-payment', CartController.confirmPayment);
router.get('/', CartController.showCartPage);
module.exports = router;