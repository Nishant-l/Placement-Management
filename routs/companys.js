const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const passport = require('passport');

router.get('/',passport.checkAuthentication,companyController.landing);
router.get('/markResult/:id',passport.checkAuthentication,companyController.displayInfo)
router.post('/form-input',passport.checkAuthentication,companyController.formInput);

module.exports = router;