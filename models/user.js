const mongoose = require('mongoose');

const userSchama = mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
});

const User = mongoose.model('User',userSchama);

module.exports = User;