const express = require('express');
const router = express.Router();
const ContactController = require('../app/controllers/ContactController');
router.get('/', ContactController.showContactPage);
module.exports = router;