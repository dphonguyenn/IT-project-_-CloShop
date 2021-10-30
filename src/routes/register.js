const express = require('express');
const router = express.Router();
const RegisterController = require('../app/controllers/RegisterController');
router.post('/post-register', RegisterController.createAccount);
router.get('/', RegisterController.showRegisterPage);
module.exports = router;