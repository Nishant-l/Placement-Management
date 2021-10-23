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
    // the body of req returns an object with status of interview of all students who applied
    for (const [key, value] of Object.entries(req.body)) { 
        console.log(`${key}: ${value}`);
        Students.findById(key,(err,student)=>{
            if(err){
                res.redirect(back);
                return;
            }
            for(i of student.interviews){
                if(i.compony.toString() === req.params.id){
                    // updeating the placement status of student to true if the result of interview is Pass
                    if(value == 'Pass'){
                        student.status = true;
                    }
                    // updeating placement status of student when the result is false but cheaking if the student is passed in some other interview
                    else{
                        let trueCount = 0;
                        for(ii of student.interviews){
                            if(ii.compony.toString() != req.params.id && ii.result=='Pass'){
                                trueCount++;
                                break;
                            }
                        }
                        if(trueCount==0){
                            student.status = false;
                        }
                    }
                    // saving the status of that perticular interview
                    i.result = value;
                    student.save();
                }
            }
        })
    }
    res.redirect('back');
}