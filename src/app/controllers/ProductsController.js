const Collection = require('../model/collections/collections');
const { mongooseToObject } = require('../../util/mongoose');
class ProductsController {
    // * [GET] /products/:product_id
    show(req, res, next) {
        Collection.findOne({ id_product: req.params.id })
             .then(collection => {
                res.render('products/product', { collection: mongooseToObject(collection) });
             })
             .catch(next);
        // res.json("SUCESS");
    }
};

module.exports = new ProductsController();