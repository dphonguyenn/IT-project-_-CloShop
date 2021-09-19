class ReturnsController {
    // * [GET] /returns
    showReturnsPage(req, res, next) {
        res.render('Returns');
    }
}
module.exports = new ReturnsController();