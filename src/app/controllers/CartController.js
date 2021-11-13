var Cart = require('../../helpers/cart');
class CartController {
    // * [GET] /cart/checkout
    showCheckoutPage(req, res, next) {
        res.render('checkout');
    }

    // * [GET] /cart
    showCartPage(req, res, next) {
        // if (!req.session.cart) {
        //     res.render('cart', { products: null });
        // }
        // var cart = new Cart(req.session.cart);
        // res.render('cart',{ products: cart.generateArray(), totalPrice: cart.totalPrice });
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

