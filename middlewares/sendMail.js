const nodeMailer = require('nodemailer');


const transport = nodeMailer.createTransport({
    service:'gmail',
    auth: {
        email : process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
        
    }
})