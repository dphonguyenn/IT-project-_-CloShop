class AboutController {
    // * [GET] /about
    showAboutPage(req, res, next) {
        res.render('about');
    }
}
module.exports = new AboutController();
