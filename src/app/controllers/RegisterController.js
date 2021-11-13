const users = require('../model/user');
class RegisterController {
    // * [POST] /register/post-register
    createAccount(req, res, next) {
        const user = new users(req.body);
        users.findOne({ username: req.body.username })
            .then(data => {
                if (data) {
                    req.flash('message-error','Account has already existed!');
                    res.redirect('/register');
                }
                else {
                    req.flash('message-success','Sign up success!');
                    user.save()
                        .then(() => res.redirect('/register'))
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