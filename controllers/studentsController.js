const Student = require('../models/student');

//-----------------------------------------------------------------------------------------------------------------------
module.exports.formInpute = (req,res)=>{
    Student.create(req.body,(err,student)=>{ //creates new student in database
        if(err){ // throws error if email alredy exists in database
            console.log('erroe occured while creating new Student');
            req.flash('error',`${req.body.email} alredy exists try with different email`);
            return res.redirect('back');
        }
        // console.log(student);
        req.flash('success',`student ${student.name} created Successfully`);
        return res.redirect('back');
    })
}
//-----------------------------------------------------------------------------------------------------------------------