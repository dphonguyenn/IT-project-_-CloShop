var express = require('express');
const router = express.Router();
const RegisterController = require('../app/controllers/RegisterController');
router.get('/', RegisterController.showRegisterPage);
module.exports = router;