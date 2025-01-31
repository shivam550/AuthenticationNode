const { hash, compare } = require("bcryptjs")

exports.doHash = (value,saltvalue) =>{
       const result = hash(value,saltvalue)
       return result
}


exports.doHashValidation = (value,hashedValue) =>{
       const result = compare(value,hashedValue)
       return result
}