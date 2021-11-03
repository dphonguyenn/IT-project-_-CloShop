const users = require('../model/user');
const ObjectID = require('mongodb').ObjectId;
module.exports = function checkAdmin(req, res, next) {
    if (req.isAuthenticated()) {
        const _id = ObjectID(req.session.passport.user);
        users.findOne({ _id: _id })
            .then((user) => {
                if (user.boss) {
                    next();
                }
                else {
                    res.json('Ban khong co quyen truy cap');
                }
            })
            .catch(err => {
                res.redirect('/404page');
            });
    }
}
    