const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const { extname } = require('path');
const app = express();
const port = process.env.PORT || 3000;
const route = require('./src/routes');
const db = require('./src/config/db');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const sortMiddleware = require('./src/app/middlewares/sortMiddleware');
const session = require('express-session');
const flash = require('connect-flash');
const authUtil = require('./src/util/auth');
const cookieParser = require('cookie-parser');
const inforUser = require('./src/app/middlewares/inforUser');

db.connect();
dotenv.config();
app.engine(
    'hbs',
handlebars({
    extname: '.hbs',
    helpers: require('./src/helpers/handlebars'),
    }),
);

// * passport.js
const users = require('./src/app/model/user');
app.locals.users = users;
passport.use(new LocalStrategy((username, password, done) => {
    app.locals.users.findOne({ username: username }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        if (user.password !== password) {
            return done(null, false);
        }
        return done(null, user);
    });
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    done(null, { id });
});

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    next();
});
app.use(inforUser);
app.use(sortMiddleware);
app.use(flash());
// * Thao tac voi cac file tinh
app.use(express.static(path.join(__dirname, 'src/Public')));
// * add middleware de nhan du lieu
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
//app.use(morgan('combined'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'src', 'resources', 'views'));

// * Routes init
route(app);

// * Access port
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});