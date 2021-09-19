const Collection = require('../model/collections/shirt');
const { mongooseToObject } = require('../../util/mongoose');
class CollectionsController {
    // * [GET] /collections/:slug (:slug la cac tuyen duong cua course)
    show(req, res, next) {
        // ? req.params.slug = get dia chi /collections/:slug
        Collection.findOne({ slug: req.params.slug })
            .then(collections => {
                res.render(`collections/show_${req.params.slug}`, { collection: mongooseToObject(collections) });
            })
            .catch(next);
    }
}