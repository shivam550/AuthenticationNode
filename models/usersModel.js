
const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    email:{
        type : String,
        required : [true ,"email is Required"],
        trim : true,
        unquie : [true , "Email Must Be Unique"],
        minLength:[5,"email Must Have 5 characters"],
        lowercase : true,
    },
    password:{
        type : String,
        required : [true ,"Password Must be provide"],
        trim:true,
        select:false,
    },
    verified:{
        type : Boolean,
        default: false,
    },
    verificationCode:{
        type: String,
        select : false
    },
    verificationCodeValidation:{
        type: Number,
        select : false
    },
    forgetPasswordCode:{
        type: String,
        select : false
    },
    forgetPasswordCodeValidation:{
        type: Number,
        select : false
    }
},{
    timestamps : true
})

module.exports = mongoose.model("User",userSchema)