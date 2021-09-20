const collections = require('../model/collections/collections');
const { mutipleMongooseToObject,mongooseToObject } = require('../../util/mongoose');
class CollectionsController {
    // * [GET] /collections/:slug (:slug la cac tuyen duong cua course)
    show(req,res,next) {
        collections.find({ type: "shirt" })
            .then(collections => {
                collections = mutipleMongooseToObject(collections)
                res.render('collections/collections', { collections });
            })
            .catch(next);
    };
};
module.exports = new CollectionsController();