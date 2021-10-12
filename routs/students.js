const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentsController');
const passport = require('passport');

router.post('/form-input',passport.checkAuthentication,studentController.formInpute);

module.exports = router;

