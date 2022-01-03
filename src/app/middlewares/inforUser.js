const users = require('../model/user');
const ObjectID = require('mongodb').ObjectId;
module.exports = function userInfor(req,res,next) {
    res.locals.user = {
        isAuthenticated: false,
    }
    if (req.isAuthenticated()) {
        const _id = ObjectID(req.session.passport.user);
        users.findOne({ _id: _id }, (err, user) => {
            if (err) {
                throw err;
            }
            Object.assign(res.locals.user, {
                id: _id,
                isAuthenticated: true,
                user_boss: user.boss,
                user_fullname: user.fullname,
                user_username: user.username,
                user_password: user.password,
                user_address: user.address,
                user_bill: user.bill,
                user_phone: user.phone,
                user_email: user.email,
            })
        })
    }
    next();
};