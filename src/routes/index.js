const HomeRouter = require('./home');
const AboutRouter = require ('./about');
const collectionsRouter = require('./collections');
const ReturnsRouter = require('./returns');
const ContactRouter =require('./contact');
function route(app) {
    app.use('/collections', collectionsRouter);
    app.use('/returns', ReturnsRouter);
    app.use('/about-us', AboutRouter);
    app.use('/contact', ContactRouter);
    app.use('/', HomeRouter);
}
module.exports = route;
