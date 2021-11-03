const HomeRouter = require('./home');
const AboutRouter = require ('./about');
const collectionsRouter = require('./collections');
const ReturnsRouter = require('./returns');
const ContactRouter = require('./contact');
const CartRouter = require('./cart');
const ProductsRouter = require('./products')
const RegisterRouter = require('./register');
const MeRouter = require('./me');
const AuthRouter = require('./auth');
const ErrorRouter = require('./404');
const Authenticated = require('../app/middlewares/authenticated');
const checkAdmin = require('../app/middlewares/checkAdmin');
function route(app) {
    app.use('/collections', collectionsRouter);
    app.use('/returns', ReturnsRouter);
    app.use('/about-us', AboutRouter);
    app.use('/contact', ContactRouter);
    app.use('/cart', CartRouter);
    app.use('/products', ProductsRouter);
    app.use('/register', RegisterRouter);
    app.use('/auth',AuthRouter);
    app.use('/me',Authenticated, checkAdmin, MeRouter);
    app.use('/404page', ErrorRouter);
    app.use('/', HomeRouter);
}
module.exports = route;
