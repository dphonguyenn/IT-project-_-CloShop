const express = require('express');
const router = express.Router();
const AccountController = require('../app/controllers/AccountController');
router.get('/information-account', AccountController.showInforAccPages);
router.put('/update-account/:username',AccountController.updateAccount);
module.exports = router;
