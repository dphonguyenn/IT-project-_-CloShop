const collections = require('../model/collections/collections');
const { mutipleMongooseToObject,mongooseToObject } = require('../../util/mongoose');
class MeController {
    // * [GET] /me/create-product
    showCreatePage(req, res, next) {
        res.render('me/create');
    }
    // * [POST] /me/stoted
    stored(req, res, next) {
        // req.body: data of form
        const formData = req.body;
        // formData.id_product = `${req.body.type}`;
        const product = new collections(formData);
        product.save()
            .then(() => res.redirect("/me/stored/products"))
            .catch(error => {

            })
    }
    // * [GET] /me/stored/products
    showProducts(req, res, next) {
        collections.find({})
            .then(products => {
                products = mutipleMongooseToObject(products);
                res.render('me/stored-products', { products });
            })
            .catch(next)

    }
    // * [GET] /me/stored/:id/edit
    showEditPage(req, res, next) {
        collections.findById(req.params.id)
            .then(product => {
                product = mongooseToObject(product);
                res.render("me/edit", { product });
            })
            .catch(next);
    }
    // * [PUT] /me/products/:id
    updateProduct(req, res, next) {
        collections.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/products'))
            .catch(next);
    }
    // * [DELETE] /me/products/:id
    deleteProduct(req, res, next) {
        collections.deleteOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('back'))// redirect(back): quay tro lai trang trc do
            .catch(next)
    }
};
module.exports = new MeController();