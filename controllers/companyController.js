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
                result:'onHold'
            }
            student.interviews.push(dummyy);
            // console.log(student.interviews);
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

module.exports.markResult = (req,res)=>{
    Company.findById(req.params.id)
    .populate('studentsApplied')
    .exec((err,compony)=>{
        res.render('markResult',{compony:compony});
    })
}

module.exports.resultForm = (req,res)=>{
    for (const [key, value] of Object.entries(req.body)) {
        console.log(`${key}: ${value}`);
        Students.findById(key,(err,student)=>{
            if(err){
                res.redirect(back);
                return;
            }
            for(i of student.interviews){
                if(i.compony.toString() === req.params.id){
                    if(value == 'Pass'){
                        student.status = true;
                    }
                    i.result = value;
                    student.save();
                }
            }
        })
    }
    // console.log(req.body);
    res.redirect('back');
}