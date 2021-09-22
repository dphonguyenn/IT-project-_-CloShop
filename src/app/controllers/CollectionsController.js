const collections = require('../model/collections/collections');
const { mutipleMongooseToObject,mongooseToObject } = require('../../util/mongoose');
class CollectionsController {
    // * [GET] /collections/:slug 
    show(req,res,next) {
        collections.find({ type: req.params.slug})
            .then(collections => {
                collections = mutipleMongooseToObject(collections);
                res.render('collections/collections', { collections,type:collections[0].type });
                // res.json(collections[0].type);
            })
            .catch(next);
    };
};
module.exports = new CollectionsController();