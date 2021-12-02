const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.redirect('/users/signin');
})
router.use('/users',require('./users'));
router.use('/students',require('./students'));
router.use('/company',require('./companys'));
router.use('/allInfo',require('./allInfo'));

module.exports = router;

