const users = require('../model/user');
class AccountController {
    // * [GET] /account/information-account
    showInforAccPages(req, res, next) {
        res.render("account/account-info", {
            message_success: req.flash('message-success'),
        });
    }
    // * [POST] /account/update-account/:username
    updateAccount(req, res, next) {
        users.updateOne({ username: req.params.username }, req.body)
            .then(() => {
                req.flash('message-success','Cập nhập tài khoản thành công!');
                res.redirect('back');
            })
            .catch(next);
    }
}
module.exports = new AccountController();
