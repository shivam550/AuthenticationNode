const express = require ('express');
const authController = require('../controllers/authController');
const { identifier } = require('../middlewares/identification');

const router = express.Router();




router.post('/signup', authController.signUp)

router.post('/signin',authController.signIn)

router.post('/signout',identifier,authController.signOut)

router.patch('/send-verification-code',identifier,authController.sendVerificationCode)
router.patch('/verify-verification-code',identifier,authController.verifyVerificationCode)
router.patch('/change-password',identifier,authController.changePassword)




module.exports = router;
