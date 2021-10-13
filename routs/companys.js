const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const passport = require('passport');

router.get('/',passport.checkAuthentication,companyController.landing);
router.get('/markResult/:id',passport.checkAuthentication,companyController.markResult)
router.post('/form-input',passport.checkAuthentication,companyController.formInput);
router.post('/result-form/:id',passport.checkAuthentication,companyController.resultForm);

module.exports = router;