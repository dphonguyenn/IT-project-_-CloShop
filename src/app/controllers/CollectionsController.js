const collections = require('../model/collections/collections');
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
class CollectionsController {
    // * [GET] /collections/:slug 
    show(req, res, next) {
        var page = parseInt(req.query.page) || 1;
        var perPage = 9;
        var start = (page - 1) * perPage;
        var end = page * perPage;
        Promise.all([
            collections.find({ type: req.params.slug }),
            collections.countDocuments({ type: req.params.slug })
        ])
            .then(([collections,count_collections]) => {
                collections = multipleMongooseToObject(collections);
                const num_page = parseInt(count_collections / perPage + 1);
                const num_index = [];
                for (var i = 1; i <= num_page; i++){
                    num_index[i - 1] = {
                        index: i,
                        type: collections[0].type,
                    };
                }
                let result = num_index.map(a => a.index);
                // res.json(result);
                res.render('collections/collections', { collections: collections.slice(start,end), type: collections[0].type, num_index });
            })
            .catch(next);
    };
};
module.exports = new CollectionsController();