const express = require ('express');
const authController = require('../controllers/authController')

const router = express.Router();




router.post('/signup', authController.signUp)

router.post('/signin',authController.signIn)

router.post('/signout',authController.signOut)

router.patch('/send-verification-code',authController.sendVerificationCode)
router.patch('/verify-verification-code',authController.verifyVerificationCode)



module.exports = router;
