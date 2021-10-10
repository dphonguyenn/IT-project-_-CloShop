const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const { extname } = require('path');
const app = express();
const port = process.env.PORT || 3000;
const route = require('./src/routes');
const db = require('./src/config/db');
// convert method
const methodOverride = require('method-override');
// export dotenv to read file env
const dotenv = require('dotenv');
// const URI = process.env.DATABASE_URL;

const sortMiddleware = require('./src/app/middlewares/sortMiddleware');
var session = require('express-session');
var flash = require('connect-flash');

// * use session
app.use(session({
     secret: 'secret',
     cookie: { masAge: 60000 },
     resave: false,
     saveUninitialized: false,
}));

// * use flash-message
app.use(flash());

// * use sort-middleware
app.use(sortMiddleware);

// * use dotenv
dotenv.config();

// * Connect db
db.connect();

// * Thao tac voi cac file tinh
app.use(express.static(path.join(__dirname, 'src/Public')));

// * add middleware de nhan du lieu
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

// * use methodOverride
app.use(methodOverride('_method'));

// * HTTP logger
//app.use(morgan('combined'))

// * Template engine
app.engine(
    'hbs',
handlebars({
    extname: '.hbs',
    helpers: require('./src/helpers/handlebars'),
    
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'src', 'resources', 'views'));

// * Routes init
route(app);

// * Access port
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});