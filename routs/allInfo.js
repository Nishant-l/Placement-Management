const express = require('express');
const router = express.Router();
const allInfoController = require('../controllers/allInfoController');
const passport = require('passport');

router.get('/',passport.checkAuthentication,allInfoController.fetchInfo);

module.exports = router;;