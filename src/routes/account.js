const express = require('express');
const router = express.Router();
const AccountController = require('../app/controllers/AccountController');
router.get('/information-account', AccountController.showInforAccPages);
router.get('/management-bills/:id', AccountController.showProgressBill);
router.get('/management-bills', AccountController.showMngBillsPage);
router.put('/update-account/:username',AccountController.updateAccount);
module.exports = router;
