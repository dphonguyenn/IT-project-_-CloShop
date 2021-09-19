const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
class HomeController {
    // * [GET] /
    showMainPage(req, res, next) {
        res.render('home');
    }
}
module.exports = new HomeController();
