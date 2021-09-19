class ContactController {
    // * [GET] /contact
    showContactPage(req, res, next) {
        res.render('contact');
    }
}
module.exports = new ContactController();