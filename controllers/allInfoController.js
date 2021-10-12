const Student = require('../models/student');
const Company = require('../models/company');

module.exports.fetchInfo = (req,res)=>{
    Student.find({})
    .populate({
        path:'interviews',
        populate:{
            path:'compony'
        }
    })
    .exec((err,student)=>{
        res.render('allInfo',{students:student});
    })
}


