const mongoose = require('mongoose');

// signUp Schema

const SignUpSchema=mongoose.Schema({
    name:{
        type:String,                                                         
        required:true
    },
    username:{
        type:String,                                                         
        required:true
    },
    phoneNumber:{
        type:String,                                                         
        required:true
    },
    password:{
        type:String,                                                          
        required:true
    }
})



const MovieBox = mongoose.connection.useDb('MovieBox');

const usersSignUpData =MovieBox.model('MovieBox',SignUpSchema);

module.exports={usersSignUpData};