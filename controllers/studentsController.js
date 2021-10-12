const Student = require('../models/student');

module.exports.formInpute = (req,res)=>{
    Student.create(req.body,(err,student)=>{
        if(err){
            console.log('erroe occured while creating new Student');
            return res.redirect('back');
        }
        console.log(student);
        return res.redirect('back');
    })
}
