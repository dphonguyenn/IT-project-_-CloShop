const collections = require('../model/collections/collections');
const { multipleMongooseToObject,mongooseToObject } = require('../../util/mongoose');
class CollectionsController {
    // * [GET] /collections/:slug 
    show(req,res,next) {
        collections.find({ type: req.params.slug})
            .then(collections => {
                collections = multipleMongooseToObject(collections);
                res.render('collections/collections', { collections,type:collections[0].type });
            })
            .catch(next);
    };
};
module.exports = new CollectionsController();