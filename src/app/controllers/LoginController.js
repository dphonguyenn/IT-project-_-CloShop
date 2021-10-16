const users = require('../model/user');
class LoginController {
    // * [POST] /register/post-register
    login(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;
        users.findOne({
            username: username,
            password: password
        })
            .then(data => {
                if (data) {
                    var token = jwt.sign({ _id: data._id },'secret')
                    return res.json({
                        message: 'Success',
                        token: token
                    });
                }
                else {
                    res.json('Fail')
                }
            })
            .catch(err => {
                res.status(404).json('Not Found!');
            })
    }
}
module.exports = new LoginController();