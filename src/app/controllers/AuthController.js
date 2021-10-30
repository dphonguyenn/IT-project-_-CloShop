const users = require('../model/user');
class AuthController {
    // * [POST] /auth/login
    login(req, res, next) {
        res.redirect('/');
    }
    // *[POST] /auth/logout
    logout(req, res, next) {
        req.session.destroy();
        res.redirect('back');
    }
}
module.exports = new AuthController();