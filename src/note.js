

// todo: Cac buoc thuc hien method [DELETE] (use method-override of Express to exchange [POST] -> [DELETE] ) -> npm install method-override
// * B1: o list product tai moi row chua product , tao 1 the a hoac button de thuc hien cong viec xoa
// * B2: Tao 1 modal confirm de xac nhan viec xoa product
// * B3: Quay lai the a/button vua tao them vao cac thuoc tinh: data-toggle="modal" data-target="#delete-product-modal" de nhan vao the a/button modal se hien len
// * B4: Tai modal confirm them vao id="delete-product-modal" de match voi the a/button
// * B5: Sau khi thuc hien xog match modal vs a/button, ta se tien hanh get id cua product ma ta nhap vao a/button cho modal
// * B6: Them vao a/button attribute data-id="{{this._id}}" (data-__name)
// * B7: Tao the script, tu docs cua bootstrap -> add: 
//        $('#delete-product-modal').on('show.bs.modal', function (event) {
//            var button = $(event.relatedTarget) 
//            productId = button.data('id') 
//        });
// * B8: Ki hieu $ cua jquery chua duoc load vao file nen xay ra loi, bo code tren vao de chac chan code duoc chay sau khi $ da duoc load
//        document.addEventListener("DOMContentLoaded", function(e) { 
//            $('#delete-product-modal').on('show.bs.modal', function (event) {
//                var button = $(event.relatedTarget) 
//                productId = button.data('id') 
//            });
//        });
// * B9: Tao 1 form hidden de gui request len server 
// * B10: Lang nghe su kien click tren button DELETE cua modal, add action la path duoc config cho method [DELETE] o route /me,  path   =   path_config + ?_method=DELETE
// *                                                                                                                   (/me/products/:id)  '/me/products/' + productId + '?_method=DELETE' 
// * B11: add submit for form -> delete-form.submit()
// * B0: Chu trinh send request sau khi submit -> qua route /me config o route/index.js -> qua route /me/products/:id (method [DELETE])
// *     -> Lot vao MeController.function ung voi method va tien hanh xoa -> 
//        collections.deleteOne({ _id: req.params.id }, req.body)
//            .then(() => res.redirect('back'))
//            .catch(next)


// todo:  Custom method [DELETE] -> soft [DELETE] (use ' npm install mongoose-delete ' of mongoose)
// * B1: Add plugin of mongoose-delete on model collections.js
// * B2: At MeController.js -> change default function 'deleteOne' of mongoose to function 'delete' of mongoose-delete lib
// * _ Luc nay khi tien hanh xoa trong db se them field _ deleted: true _ o product ma ta xoa nhung khong cap nhap tren List Products WEB 
// * B3: Add options { overrideMethods: 'all' } o plugin vua tao de ghi de len ban ghi cu 
// * _ List Product WEB se duoc cap nhap khi xoa nhu default _ deleteOne 
// * B4: Add options { deletedAt : true } vao plugin (collections model) _ de cap nhap them field deletedAt vao db de biet thoi gian ta thuc hien xoa


// todo:  Luong hoat dong cua middleware-sort:
// ! query: ?_sort&column=price&type=desc 
// * _sortMiddleware.js (folder middleware) _ middle-ware này sẽ hoạt động ở tất cả các pages để thực hiện công việc sort
// module.exports = function sortMiddleware(req, res, next) {
//    res.locals._sort = {
//         enabled: false,
//         type:'default'
//     };
//     if (req.query.hasOwnProperty('_sort')) {
//         Object.assign(res.locals._sort, {
//             enabled: true,
//             type: req.query.type,
//             column: req.query.column,
//         })
//     }
//     next();
// }
// ? tạo một object vs phương thức locals để đưa data và view _vs default type là không sort
// ? khi gặp URL có query: _sort _ gán lại kiểu sort và cột được sort cho object 
// * _server.js
// const sortMiddleware = require('./src/app/middlewares/sortMiddleware');
// app.use(sortMiddleware);
// * handlebars.js (folder helper)
// sortable: (fieldName, sort) => {
//         const icons = {
//             default: 'oi oi-elevator',
//             asc: 'fas fa-sort-alpha-up-alt',
//             desc: 'fas fa-sort-alpha-up'
//         }
//         const types = {
//             default: 'desc',
//             asc: 'desc',
//             desc: 'asc'
//         }
//         const sortType = fieldName === sort.column ? sort.type : 'default';
//         const icon = icons[sortType];
//         const type = types[sortType];
//         const href = Handlebars.escapeExpression(`?_sort&column=${fieldName}&type=${type}`)
//         const result = `<a href="${href}">
//             <span class="${icon}"></span>
//         </a>`
//         return new Handlebars.SafeString(result);
//     }
// ? function-helper sortable nhận vào 2 đối số 1 là tên của cột cần sort, 2 là object _sort định nghĩa trong middleware 
// ? mặc định sortable sẽ render ra default icons và không sort
// ? khi nhấn vào icons sort, thẻ a của icons sẽ truyền đi href="?_sort&column=${fieldName}&type=${type}" lên URL
// ? lúc này middleware nhận được và gán lại các field cho object _sort
// ? khi qua được middleware sẽ đến controller _ controller nếu nhận được res.query.hasOwnProperties('_sort') thì sẽ thực hiện công việc sort -> hoàn thành công việc sort 



// ? cookie 
// * Cookie là những tập tin một trang web gửi đến máy người dùng và được lưu lại thông qua trình duyệt khi người dùng truy cập trang web đó. 
// * Cookie được dùng để lưu trữ với rất nhiều mục đích như lưu phiên đăng nhập, hoạt động của người dùng khi truy cập trang web.
// * Session Cookie: chỉ tồn tại tạm thời trong bộ nhớ của trình duyệt và sẽ bị trình duyệt tự xóa khi người dùng hết phiên đăng nhập
// * Để sử dụng cookie trong express chúng ta cần phải cài thêm một vài middleware bên thứ 3 :  npm i cookie-parser
// * khai bao:
// const express = require('express')
// const cookieParser = require('cookie-parser')
// const app = express()
// app.use(cookieParser()) _ cookieParser(secret, options)
// * tao cookie : res.cookie(name, value, [options])
// * lay gia tri cookie : req.cookie.[name]


// todo: add flash-message
// npm i express-session connect-flash
// _ server.js:
// var session = require('express-session');
// var flash = require('connect-flash');
// app.use(session({
//      secret: 'secret',
//      cookie: { masAge: 60000 },
//      resave: false,
//      saveUninitialized: false,
// }));
// app.use(flash());
// _ add to controller _ post form  
// req.flash('message','Create Account success!');
// res.redirect('back');
// _ add to controller _ render
// res.render('register',{ message: req.flash('message')});
// _ ở view.hbs cần hiển thị flash-message
// tạo logic để render flash-message



// ? JWT (JsonWebToken)
// * JWT là một phương tiện đại diện cho các yêu cầu chuyển giao giữa hai bên Client – Server
// * JWT bao gồm 3 phần, được ngăn cách nhau bởi dấu chấm (.): header.payload.signature
// * data + secret  ---(sign)--> token (header.payload.signature)
// * VD : 
// const jwt = require('jsonwebtoken');
// var data = { username: 'duyphongz1' }
// var secret = { password: 'phong123456' }
// var token = sign(data, secret)
// * --> token sẽ được encode thành dãy JWT
// * token + secret --(verify)--> token
// * VD :
// var decode = verify(token, secret) 
// * --> decode = data = { username: 'duyphongz1' }
// * Mỗi token khi được tạo ra đều có hạn sử dụng(expire) và sẽ không thể hủy cho đến khi hết hạn sử dụng
// * Để xét hạn sử dụng cho token:
// token = jwt.sign(data, secret, {
//     expiresIn: (_time: đơn vị là giây)
// })
// * Nếu hàm sign có callback thì hàm sẽ làm hàm async


// ? PASSPORT.JS
// todo: Sử dụng PASSPORT.JS để thực hiện xác thực và phân quyền người dùng
// * B1: Install passport.js:
// npm install passport
// * B2: Config PASSPORT ở file server.js
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
// const users = require('./src/app/model/user');
// app.locals.users = users;
// passport.use(new LocalStrategy((username, password, done) => {
//     app.locals.users.findOne({ username: username }, (err, user) => {
//         if (err) {
//             return done(err);
//         }
//         if (!user) {
//             return done(null, false);
//         }
//         if (user.password !== password) {
//             return done(null, false);
//         }
//         return done(null, user);
//     });
// }));

// passport.serializeUser((user, done) => {
//     done(null, user._id);
// });

// passport.deserializeUser((id, done) => {
//     done(null, { id });
// });

// app.use(session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: false,
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use((req, res, next) => {
//     res.locals.loggedIn = req.isAuthenticated();
//     next();
// });
// app.use(cookieParser());
// * B3: Tạo Router cho tuyến đường /auth để thực hiện các công việc liên quan đến xác thực, login, logout:
// const express = require('express');
// const router = express.Router();
// const authUtil = require('../util/auth');
// const passport = require('passport');
// const AuthController = require('../app/controllers/AuthController');
// router.post('/login', passport.authenticate('local', {
//     failureRedirect:'/404page',
//     failureFlash:'Wrong username or password'
// }), AuthController.login);
// router.post('/logout', AuthController.logout);
// router.post('/logout-me', AuthController.logoutMe);
// module.exports = router;
// * B4: Build AuthController cho /auth
// src/app/controller/AuthController


// todo: Use res.locals._variable to save user's data after login
// * B1: Tạo một middleware inforUser.js ở thư mục src/app/middlewares/inforUser.js
// const users = require('../model/user');
// const ObjectID = require('mongodb').ObjectId;
// module.exports = function userInfor(req,res,next) {
//     res.locals.user = {
//         isAuthenticated: false,
//     }
//     if (req.isAuthenticated()) {
//         const _id = ObjectID(req.session.passport.user);
//         users.findOne({ _id: _id }, (err, user) => {
//             if (err) {
//                 throw err;
//             }
//             Object.assign(res.locals.user, {
//                 isAuthenticated: true,
//                 user_boss: user.boss,
//                 user_fullname: user.fullname,
//                 user_username: user.username,
//                 user_password: user.password,
//                 user_address: user.address,
//                 user_phone: user.phone,
//                 user_email: user.email,
//             })
//         })
//     }
//     next();
// };
// ? -> Giai thích: biến locals _user mặc định có một property mô tả chưa đăng nhập
// ? Khi đăng nhập thành công passportJS sẽ giúp ta tạo ra 1 session sử dụng cho phiên đăng nhập
// ? Ta dựa vào đây để xem thử ai là người đã đăng nhập và lưu thông tin của người dùng đó vào biến locals user để dùng cho việc render ra view các thông tin của người dùng
// ? Để kiểm tra đã đăng nhập chưa với passport sử dụng: req.isAuthenticated()
// ? Cách lấy id của người đăng nhập để đối chiếu truy xuất dữ liệu người dùng phía database:  const _id = ObjectID(req.session.passport.user);



// todo: Panigation
// * Tham khảo tại: _ https://www.youtube.com/watch?v=4FNhcSlCKoY&t=3s


// todo: Sử dụng node-fetch để call API từ một trang web khác
// * Vì nodeJS không hỗ trợ fetch nên để sử dụng fetch ta cần phải cài gói package node-fetch
// * Install: (version x2)
// npm install node-fetch@2
// * Khai báo toàn cục để sử dụng trong app
// const fetch = require('node-fetch');
// globalThis.fetch = fetch;
// * Cách sử dụng: _ ĐỌC DOCS tại: https://github.com/node-fetch/node-fetch/tree/2.x#readme