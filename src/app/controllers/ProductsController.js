const Collections = require('../model/collections/collections');
const { mongooseToObject } = require('../../util/mongoose');
var Cart = require('../../helpers/cart');
class ProductsController {

    // * [GET] /products/add-to-cart/:id
    addToCart(req, res, next) {
        var productId = req.params.id;
        var cart = new Cart(req.session.cart ? req.session.cart : {});
        Collections.findById(productId)
            .then(product => {
                cart.add(product, product.id);
                req.session.cart = cart;
                req.flash('message-add-success', 'Add to cart successfully!');
                // console.log(req.session.cart);
                res.redirect('back');
            })
            .catch(next)

    }

    // * [GET] /products/subtract-to-cart/:id
    subtractToCart(req, res, next) {
        var productId = req.params.id;
        var cart = new Cart(req.session.cart ? req.session.cart : {});
        Collections.findById(productId)
            .then(product => {
                cart.subtract(product.id);
                req.session.cart = cart;
                res.redirect('back');
            })
            .catch(next)
    }

    // *[GET] /products/remove-to-cart/:id
    removeToCart(req, res, next) {
        var productId = req.params.id;
        var cart = new Cart(req.session.cart ? req.session.cart : {});
        Collections.findById(productId)
            .then(product => {
                cart.removeProduct(product.id);
                req.session.cart = cart;
                res.redirect('back');
            })
            .catch(next)
    }

    // * [GET] /products/:id
    show(req, res, next) {
        Collections.findOne({ id_product: req.params.id })
            .then(collection => {
                const message = req.flash();
                res.render('products/product', { collection: mongooseToObject(collection), message });
            })
            .catch(next);
    }
};

module.exports = new ProductsController();