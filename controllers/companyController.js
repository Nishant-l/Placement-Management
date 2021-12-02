const Students = require('../models/student');
const Company = require('../models/company');

//------------------------------------------------------------------------------------------------------------
// control to handel the form input of creating new compony
module.exports.formInput = (req,res)=>{
  Company.create(req.body,(err,company)=>{ //create new entry in database
    if(err){
        console.log('erroe occured while creating new Company');
        req.flash('error',`erroe occured while creating new Company`);
        return res.redirect('back');
    }
    for(apliedStudent of company.studentsApplied){ //iterate over list of student who were assigned to compony
        // console.log(req.body.studentsApplied);
        Students.findById(apliedStudent,(err,student)=>{ //find student from student table
            // console.log(student);
            const dummyy = {  // creates object of interview ---> compony relation
                compony:company._id,
                result:'OnHold'
            }
            student.interviews.push(dummyy); //update the student intrview array by pushing the compony to it
            // console.log(student.interviews);
            student.save();
        })
    };
    req.flash('success',`compony ${company.name} created Successfully`);
    return res.redirect('back');
  })
};

//-----------------------------------------------------------------------------------------------------------------------
// renders compony page with form to create new compony and list of student and previously created compony
module.exports.landing = (req,res)=>{
    Students.find({},(err,students)=>{
        Company.find({},(err,componies)=>{
            res.render('companie',{students:students,componies:componies});
        })
    })
}

//-----------------------------------------------------------------------------------------------------------------------
// renders page with a specific Compony and list of all students who applied for it
module.exports.markResult = (req,res)=>{
    Company.findById(req.params.id)
    .populate('studentsApplied')
    .exec((err,compony)=>{
        res.render('markResult',{compony:compony});
    })
}

//-----------------------------------------------------------------------------------------------------------------------
module.exports.resultForm = (req,res)=>{
    // the body of req returns an object with status of interview of all students who applied
    for (const [key, value] of Object.entries(req.body)) { 
        // console.log(`${key}: ${value}`);
        Students.findById(key,(err,student)=>{
            if(err){
                req.flash('error',`${student.name} not found`);
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
    req.flash('success','Results Updated Successfully');
    return res.redirect('back');
}
//-----------------------------------------------------------------------------------------------------------------------