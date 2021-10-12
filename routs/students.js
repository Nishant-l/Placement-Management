const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentsController');

router.post('/form-input',studentController.formInpute);

module.exports = router;

