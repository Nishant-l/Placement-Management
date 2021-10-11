// setting up configration for Passport for local Strategy;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({usernameField: 'email'},(email,password,done)=>{
    User.findOne({email:email},(err,user)=>{
        if(err){
            console.log(`error finding user --> passport`)
            return done(err);
        }
        if(!user || user.password != password){
            console.log('password missmatch --> password');
            return done(null,false);
        }
        if(user && user.password == password){
            return done(null,user);
        }
        return done(null,false);
    })
}));

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        if(err){
            return done(err);
        }
        return done(null,user);
    })
});

passport.checkAuthentication = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/users/signIn');
}

passport.setAuthenticatedUser = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;