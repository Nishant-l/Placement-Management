const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const passport = require('passport');

router.get('/',(req,res)=>{
    res.end('in user');
})
router.get('/signin',userController.signIn);
router.get('/signup',userController.signUp);
router.get('/home',passport.checkAuthentication,userController.home);
router.get('/signout',passport.checkAuthentication,userController.logOut);

router.post('/form-signUp',userController.formSignUp);
router.post('/form-signIn',passport.authenticate('local',{failureRedirect:'/users/signIn'}),userController.formSignIn);

module.exports = router;