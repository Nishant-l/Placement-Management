const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

router.get('/',companyController.landing);
router.post('/form-input',companyController.formInput);

module.exports = router;