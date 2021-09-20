class CartController {
    // * [GET] /cart
    showCartPage(req, res, next) {
        res.render('cart');
    }
}
module.exports = new CartController();

