var express = require('express');
const router = express.Router();
const HomeController = require('../app/controllers/HomeController');
router.get('/', HomeController.showMainPage);
module.exports = router;