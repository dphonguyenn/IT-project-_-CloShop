module.exports = function Authenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        req.flash('message-notlogin', 'Please login to take action.');
        return res.redirect('back');
    }
    next();
}