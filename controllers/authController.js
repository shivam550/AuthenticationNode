const { signUpschema,signInschema } = require("../middlewares/validator");
const User = require('../models/usersModel');
const { doHash,doHashValidation } = require("../utils/hashing");
const jwt = require("jsonwebtoken");

exports.signUp = async(req,res)=>{
    const {email,password} = req.body;
    try {
         const {error ,value } = signUpschema.validate({email,password})
         if(error){
            res.status(401).json({success:false,msg:error.details[0].message})
         }
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(401).json({success:false, msg:"user already exists !"})
        }
        const hashPassword = await doHash(password,12);

        const newUser = new User({
            email,
            password: hashPassword,
        })

        const result = await newUser.save()

        result.password = undefined;

        res.status(201).json({
            success:true,msg:"you account has been created successfully",result
        })
    } catch (error) {
       console.log(error) 
    }
}

exports.signIn = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const {error, value} = signInschema.validate({email,password});
        if(error){
            return res.status(401).json({success:false,msg:error.details[0].message})
        }
        const existingUser = await User.findOne({email}).select('+password')
        if(!existingUser){
            return res.status(401).json({success:false,message:'User deos not exists'})
        }
        const result = await doHashValidation (password,existingUser.password)
        if(!result) return res.status(401).json({success:false,msg:"Invalid Credenials"})
        
        const token = await jwt.sign({
            userId : existingUser._id,
            email : existingUser.email,
            verified : existingUser.verified,

        },process.env.TOKEN_SECRET);

        res.cookie('Authorization','Bearer ' + token , {expires : new Date(Date.now()+ 8*3600000 ),
            httpOnly: process.env.NODE_ENV === 'production', 
            secure : process.env.NODE_ENV === 'production'})
            .json({
                success:true,
                token,
                message:"Logged in successFully"
            })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    } catch (error) {
        console.log(error)
    }
}

exports.signOut = async(req,res)=>{
    res.clearCookie('Authorization').status(200).json({success:true,message:"You are logout successfully"});
}

exports.sendVerificationCode = async (req,res)=>{
   const {email} = req.body ;
   try {
    const existingUser = await User.findOne({email}) 
    if(!existingUser){
        return res.status(404).json({success:false,message:'User deos not exists'})
    }
    if(existingUser.verified){
        return res.status(400)
        .json({success:false,message:"you are already verified"})
    }

    const codeValue = Math.floor(Math.random() * 1000000).toString()
   } catch (error) {
     console.log(error);
   }
}