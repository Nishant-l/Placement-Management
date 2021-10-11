const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('welcome');
})
router.use('/users',require('./users'));

module.exports = router;

