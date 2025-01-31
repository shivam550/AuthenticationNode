const joi = require('joi');

exports.signUpschema = joi.object({
    email:joi.string().min(6).max(60).required().email({
        tlds:{ allow : ['com','net']}
    }),
    password : joi.string()
                  .required()
                  .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,50}$'))
})
exports.signInschema = joi.object({
    email:joi.string().min(6).max(60).required().email({
        tlds:{ allow : ['com','net']}
    }),
    password : joi.string()
                  .required()
                  .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,50}$'))
})
