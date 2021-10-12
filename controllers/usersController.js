const User = require('../models/user');

module.exports.signIn = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/home');
    }
    res.render('signin');
}

module.exports.signUp = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/home');
    }
    res.render('signup');
}

module.exports.home = (req,res)=>{
    res.render('home');
}

module.exports.formSignIn = (req,res)=>{
    // console.log(req.user);
    return res.redirect('home');
}

module.exports.formSignUp = (req,res)=>{
    User.create(req.body,(err,user)=>{
        if(err){
            console.log('erroe occured while creating new user');
            return res.redirect('back');
        }
        // console.log(user);
        return res.redirect('/users/signin');
    })
}

module.exports.logOut = (req,res)=>{
    req.logout();
    res.redirect('/users/signin');

}