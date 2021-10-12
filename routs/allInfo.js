const express = require('express');
const router = express.Router();
const allInfoController = require('../controllers/allInfoController');

router.get('/',allInfoController.fetchInfo);

module.exports = router;;