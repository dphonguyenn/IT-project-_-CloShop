const HomeRouter = require('./home');
const AboutRouter = require ('./about');
const collectionsRouter = require('./collections');
const ReturnsRouter = require('./returns');
const ContactRouter = require('./contact');
const CartRouter = require('./cart');
function route(app) {
    app.use('/collections', collectionsRouter);
    app.use('/returns', ReturnsRouter);
    app.use('/about-us', AboutRouter);
    app.use('/contact', ContactRouter);
    app.use('/cart',CartRouter);
    app.use('/', HomeRouter);
}
module.exports = route;
