var express = require('express');
const router = express.Router();
const LoginController = require('../app/controllers/LoginController');
router.post('/', LoginController.login);
module.exports = router;