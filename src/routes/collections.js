var express = require('express');
const router = express.Router();
const CollectionsController = require('../app/controllers/CollectionsController');

router.get('/:slug', CollectionsController.show); // ? /collections/:slug
module.exports = router;