class RegisterController {
    // * [GET] /register
    showRegisterPage(req, res, next) {
        res.render('register');
    }
}
module.exports = new RegisterController();