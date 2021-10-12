const mongoose = require('mongoose');

const studentSchama = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    batch:{
        type:String,
        required:true
    },
    collage:{
        type:String,
        required:true
    },
    status:{
        type:Boolean
    },
    dsaScore:{
        type:Number
    },
    webDevScore:{
        type:Number
    },
    reactScore:{
        type:Number
    },
    interviews:[{
        compony:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Company',
        },
        score:{
            type:Number
        }
    }]
})

const Student = mongoose.model('Student',studentSchama);

module.exports = Student;