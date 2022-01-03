var Cart = require('../../helpers/cart');
const Bill = require('../model/bill');
const users = require('../model/user');
const ObjectID = require('mongodb').ObjectId;
class CartController {
    // * [GET] /cart/checkout
    showCheckoutPage(req, res, next) {
        if (req.session.cart) {
            var cart = new Cart(req.session.cart);
            res.render('checkout', { products: cart.generateArray(), totalPrice: cart.totalPrice });
        }
        else {
            res.render('404page');
        }
    }

    // * [POST] /cart/confirm-payment
    confirmPayment(req, res, next) {
        var bill = {};
        var _id = null;
        if (req.isAuthenticated()) {
            _id = ObjectID(req.session.passport.user);
        }
        Bill.countDocuments()
            .then(n => {
                return bill = {
                    id: createId(n),
                    id_user: _id,
                    fullname: req.body.fullname,
                    address: req.body.address,
                    city: req.body.city,
                    district: req.body.district,
                    ward: req.body.ward,
                    email: req.body.email,
                    phone: req.body.phone,
                    note: req.body.note,
                    products: req.body.products,
                    quantity: req.body.quantity,
                    totalPrice: req.body.totalPrice,
                    payment: req.body.payments,
                    isChecked: false
                }
            })
            .then(data => {
                const billPost = new Bill(data);
                Promise.all([
                    billPost.save(),
                    users.findByIdAndUpdate(_id, { $push: { bill: bill } }, { upsert: true })
                ])
                    .then(([bill, buyer]) => {
                        req.session.cart = null;
                        res.render('confirmPayment');
                    })
            })
            .catch(err => res.json(err))
    
        function createId(n) {
            const number = 10000000000 + n;
            return  "ID" + String(number);
        }
    }

    // * [GET] /cart
    showCartPage(req, res, next) {
        if (req.session.cart) {
            var cart = new Cart(req.session.cart);
            res.render('cart',{ products: cart.generateArray(), totalPrice: cart.totalPrice });
        }
        else {
            res.render('cart', { products: null });
        }
    }
}
module.exports = new CartController();

