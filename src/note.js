

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
// * B4: Add options { deletedAt : true } vao plugin _ de cap nhap them field deletedAt vao db de biet thoi gian ta thuc hien xoa


// todo:  Luong hoat dong cua middleware-sort:
// *   B1: add vao file main server middle-ware can su dung:
// *   B2: middle-ware này sẽ áp dụng ở tất cả các trang _ mặc định của middleware-sort là tắt khi gặp url có query _sort (res.query._sort) sẽ mở 
// *   B3: trong middleware định nghĩa một biến vs phương thức locals để truyền dữ liệu vào view 
// *   B3: Khi trang load sẽ load các san phẩm theo thứ tự mặc định và hàm sortable của handlebars ban đầu sẽ load icon sort mặc định
// *   B4: Khi nhấn vào icon sort sẽ gửi đi 1 href query đính trên URL
// *   B5: 

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
// _ 