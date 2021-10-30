class ErrorController {
    // * [GET] /404page
    showErrorPage(req, res, next) {
        res.render('404page');
    }
}
module.exports = new ErrorController();
