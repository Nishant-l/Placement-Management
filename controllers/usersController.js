const User = require('../models/user');
const Student = require('../models/student');

//-----------------------------------------------------------------------------------------------------------------------
module.exports.signIn = (req,res)=>{ //checks if alredy sign in if not renders sign page
    if(req.isAuthenticated()){
        return res.redirect('/users/home');
    }
    res.render('signin');
}

//-----------------------------------------------------------------------------------------------------------------------
module.exports.signUp = (req,res)=>{ //checks in if alredy sign in if not renders sign up page
    if(req.isAuthenticated()){
        return res.redirect('/users/home');
    }
    res.render('signup');
}

//-----------------------------------------------------------------------------------------------------------------------
module.exports.home = (req,res)=>{  //renders homepage that displays students Info

    Student.find({},(err,student)=>{  //find all students in the db and send it as locals to ejs
        if(err){
            res.redirect('back');
            return;
        }
        res.render('home',{student,student});
    })
}

//-----------------------------------------------------------------------------------------------------------------------
module.exports.formSignIn = (req,res)=>{ //creates new session uses passport as middleware for authentication
    // console.log(req.user);
    return res.redirect('home');
}

//-----------------------------------------------------------------------------------------------------------------------
module.exports.formSignUp = (req,res)=>{  //takes in input from signup form 
    User.create(req.body,(err,user)=>{  //creates new user in database
        if(err){  //throws error if user withe same email id is trying to sign up
            console.log('erroe occured while creating new user');
            req.flash('error',`${req.body.email} alredy exists`);
            return res.redirect('back');
        }
        // console.log(user);
        req.flash('success',`signUp Successfully`);
        return res.redirect('/users/signin');
    })
}

//-----------------------------------------------------------------------------------------------------------------------
module.exports.logOut = (req,res)=>{ //sign out user by deleting the cookie
    req.logout(); // this deleates the cookie
    req.flash('success',`signOut Successfully`);
    res.redirect('/users/signin');

}
//-----------------------------------------------------------------------------------------------------------------------