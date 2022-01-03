const users = require('../model/user');
const bills = require('../model/bill');
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const ObjectID = require('mongodb').ObjectId;
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

    // * [GET] /management-bills
    showMngBillsPage(req, res, next) {
        var _id = null;
        if (req.isAuthenticated()) {
            _id = ObjectID(req.session.passport.user);
        }
        bills.find({ id_user: _id })
            .then(data => {
                data = multipleMongooseToObject(data);
                res.render('bills-mng',{bills:data});
            })
            .catch(next)
    }

    // * [GET] /management-bills/:id
    showProgressBill(req, res, next) {
        bills.findById(req.params.id)
            .then(data => { 
                data = mongooseToObject(data);
                res.render('progress-bill', { bill: data });
            })
            .catch(next)
    }
}
module.exports = new AccountController();
