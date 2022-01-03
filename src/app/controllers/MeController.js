const collections = require('../model/collections/collections');
const bills = require('../model/bill');
const users = require('../model/user');
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
class MeController {
    // ! PRODUCT

    // * [GET] /me/create-product
    showCreatePage(req, res, next) {
        res.render('me/create');
    }

    // * [POST] /me/stoted
    stored(req, res, next) {
        // req.body: data of form
        const formData = req.body;
        // formData.id_product = `${req.body.type}`;
        const product = new collections(formData);
        product.save()
            .then(() => res.redirect('/me/stored/products'))
            .catch(next)
    }

    // * [GET] /me/stored/products
    showProducts(req, res, next) {
        Promise.all([
            collections.find({}).sortable(req),// da custom chi khi can sort chi can .sortable(req)
            collections.countDocumentsDeleted(),
            collections.countDocuments()
        ])
            .then(([products,countDelete,countProduct]) => {
                products = multipleMongooseToObject(products);
                res.render('me/stored-products', {
                    products,
                    countDelete,
                    countProduct
                });
            })
            .catch(next)
    }

    // * [GET] /me/stored/trash/product
    trashProducts(req, res, next) {
        Promise.all([
            collections.findDeleted({}),
            collections.countDocumentsDeleted(),
            collections.countDocuments()
        ])
            .then(([products,countDelete,countProduct]) => {
                products = multipleMongooseToObject(products);
                res.render('me/trash-products', {
                    products,
                    countDelete,
                    countProduct
                });
            })
            .catch(next)
    }

    // * [GET] /me/stored/:id/edit
    showEditPage(req, res, next) {
        collections.findById(req.params.id)
            .then(product => {
                product = mongooseToObject(product);
                res.render("me/edit", { product });
            })
            .catch(next);
    }

    // * [PUT] /me/products/:id
    updateProduct(req, res, next) {
        collections.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/products'))
            .catch(next);
    }

    // * [DELETE] /me/products/handleActionsForm
    handleActionsForm(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                collections.delete({ _id: { $in: req.body.productId } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            case 'restore':
                collections.restore({ _id: { $in: req.body.productId } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            case 'harddelete':
                collections.deleteMany({ _id: { $in: req.body.productId } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default:
                console.log(res.json(req.body));
                // res.status(400).send('Bad Request');
        }
    }

    // * soft - [DELETE] /me/products/:id
    deleteProduct(req, res, next) {
        collections.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // * [DELETE] /me/products/:id/hard-delete
    hardDeleteProduct(req, res, next) {
        collections.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // * [PATCH] /me/products/:id/restore
    restoreProduct(req, res, next) {
        collections.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // ! BILL

    // * [GET] /me/stored/bills
    showBillsPage(req, res, next) {
        Promise.all([
            bills.find({}),
            bills.countDocumentsDeleted(),
            bills.countDocuments()
        ])
            .then(([bills,countCompletedBill,countBill]) => {
                bills = multipleMongooseToObject(bills);
                res.render('me/bill', {
                    bills,
                    countCompletedBill,
                    countBill
                });
            })
            .catch(next)
    }

    // * [DELETE] /me/bills/:id/hard-delete
    hardDeleteBill(req, res, next) {
        Promise.all([
            bills.deleteOne({ _id: req.params.id }),
        ])      
            .then(() => res.redirect('back'))
            .catch(err=>res.json(err))
    }

    // * [PUT] /me/bills/:id
    isCheckedBill(req, res, next) {
        Promise.all([
            bills.updateOne({ _id: req.params.id }, { isChecked: true }),
        ])
            .then(() => res.redirect('/me/stored/bills'))
            .catch(err => res.json(err));   
    }

    // * [GET] /me/stored/bills-completed
    showCompletedBills(req, res, next) {
        Promise.all([
            bills.findDeleted({}),
            bills.countDocumentsDeleted(),
            bills.countDocuments()
        ])
            .then(([bills,countCompletedBill,countBill]) => {
                bills = multipleMongooseToObject(bills);
                res.render('me/completedBills', {
                    bills,
                    countCompletedBill,
                    countBill
                });
            })
            .catch(next)
    }

    // * [DELETE] /me/bills/:id/soft-delete
    softDeleteBill(req, res, next) {
        bills.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // * [PATCH] /me/bills/:id/restore
    restoreBill(req, res, next) {
        bills.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // * [GET] /me/bills/:id/detailed-bill
    showDetailedBill(req, res, next) {
        bills.findById(req.params.id)
            .then(bill => {
                bill = mongooseToObject(bill);
                res.render('me/detailedBill', { bill: bill });
            })
            .catch(next)
    }
};
module.exports = new MeController();