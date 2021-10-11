const mongoose = require('mongoose');

const companySchama = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true,
    },
    studentsApplied:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    }]
});

const Company = mongoose.model('Company',companySchama);

module.exports = Company;