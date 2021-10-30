module.exports = function Authenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        res.json('Ban chua dang nhap!');
    }
    next();
}