const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// SET STORAGE Images
var storageProfileImage = multer.diskStorage({
    destination: function(req, file, cb) {
        const path = 'uploads/ProfileImage';
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
    },
    filename: function(req, file, cb) {
        cb(null, 'ProfileImage' + Date.now() + path.extname(file.originalname))
    }
})

var uploadProfileImage = multer({ storage: storageProfileImage });


// ################################# controllers #################################
const AuthenticationController = require('../controllers/User/AuthenticationController');
const ProfileController = require('../controllers/User/ProfileController');
const ExamController = require('../controllers/User/ExamController');
const SettingController = require('../controllers/User/SettingController');

// ################################# Joi  Validation Schema #################################
const UserValidation = require('../validation-schemas/User/userValidationSchema');

// ################################# Middleware #################################
const validRequest = require('../middlewares/ValidateRequest');
const AuthenticationMiddleware = require('../middlewares/AuthenticationMiddleware');

// ####################### user Authentication  #######################

router.post('/registration',validRequest.validate(UserValidation.CreateUserSchema,'body'),AuthenticationController.registeration);
router.post('/login',validRequest.validate(UserValidation.loginSchema,'body'),AuthenticationController.login);
router.post('/forget-password',validRequest.validate(UserValidation.forgetPasswordSchema,'body'),AuthenticationController.forgetPassword);
router.post('/reset-password',validRequest.validate(UserValidation.resetPasswordSchema,'body'),AuthenticationController.resetPassword);

// ####################### User Profile #######################

router.put('/update-profile',AuthenticationMiddleware.authenticateRequestAPI,validRequest.validate(UserValidation.UpdateProfileSchema,'body'),ProfileController.updateProfile);
router.put('/change-password',AuthenticationMiddleware.authenticateRequestAPI,validRequest.validate(UserValidation.ChangePasswordSchema,'body'),ProfileController.changePassword);
router.post('/update-profile-picture',AuthenticationMiddleware.authenticateRequestAPI,uploadProfileImage.single('image'),ProfileController.profileImageUpdate);
router.get('/profile-details',AuthenticationMiddleware.authenticateRequestAPI,ProfileController.ProfileDetails);

// ####################### Setting  #######################
router.get('/catagory-list',SettingController.CatagoryList);
router.get('/subcatagory-list/:catagory_id',SettingController.SubCatagoryList);

// ######################## Take Test #######################
router.get('/exam-details/:subject_id',AuthenticationMiddleware.authenticateRequestAPI,ExamController.examDetails);


module.exports = router;