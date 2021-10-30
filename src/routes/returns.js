const express = require('express');
const router = express.Router();
const ReturnsController = require('../app/controllers/ReturnsController');
router.get('/', ReturnsController.showReturnsPage);
module.exports = router;