const users = require('../model/user');
class AuthController {
    // * [POST] /auth/login
    login(req, res, next) {
        res.redirect('back');
    }
    // *[POST] /auth/logout
    logout(req, res, next) {
        req.session.destroy();
        res.redirect('/');
    }
    // *[POST] /auth/logout-me
    logoutMe(req, res, next) {
        req.session.destroy();
        res.redirect('/');
    }
}
module.exports = new AuthController();