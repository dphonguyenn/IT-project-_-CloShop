const express = require('express');
const router = express.Router();
const ErrorController = require('../app/controllers/ErrorController');
router.get('/', ErrorController.showErrorPage);
module.exports = router;