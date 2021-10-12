const Students = require('../models/student');
const Company = require('../models/company');

module.exports.formInput = (req,res)=>{
  Company.create(req.body,(err,company)=>{
    if(err){
        console.log('erroe occured while creating new Company');
        return res.redirect('back');
    }
    for(apliedStudent of company.studentsApplied){
        console.log(req.body.studentsApplied);
        Students.findById(apliedStudent,(err,student)=>{
            console.log(student);
            const dummyy = {
                compony:company._id,
            }
            student.interviews.push(dummyy);
            console.log(student.interviews);
            student.save();
        })
    };
    return res.redirect('back');
  })
};

module.exports.landing = (req,res)=>{
    Students.find({},(err,students)=>{
        Company.find({},(err,componies)=>{
            res.render('companie',{students:students,componies:componies});
        })
    })
}