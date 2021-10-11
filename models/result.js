const mongoose = require('mongoose');

const resultSchama = mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    },
    conpany:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company'
    },
    result:{
        type:String
    }
});

const Result = mongoose.model('Result',resultSchama);

module.exports = Result;