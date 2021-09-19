var express = require('express');
const router = express.Router();
const AboutController = require('../app/controllers/AboutController');
router.get('/', AboutController.showAboutPage);
module.exports = router;