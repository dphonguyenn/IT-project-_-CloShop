const users = require('../model/user');
class RegisterController {
    // * [POST] /register/post-register
    createAccount(req, res, next) {
        const user = new users(req.body);
        users.findOne({ username: req.body.username })
            .then(data => {
                if (data) {
                    req.flash('message-error','Tài khoản đã tồn tại!');
                    res.redirect('/register');
                }
                else {
                    req.flash('message-success','Bạn đã đăng ký thành công!');
                    user.save()
                        .then(() => res.redirect('back'))
                        .catch(next)
                }
            })
            .catch(next);
            
    }
    // * [GET] /register
    showRegisterPage(req, res, next) {
        const messages = req.flash();
        res.render('register', {
                messages
            }
        );
    }
}
module.exports = new RegisterController();