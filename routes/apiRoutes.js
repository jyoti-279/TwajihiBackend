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
const PeriorYearExamController = require('../controllers/User/PeriorYearExamController');

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
router.get('/exam-list/:id',AuthenticationMiddleware.authenticateRequestAPI,validRequest.validate(UserValidation.listUserSchema,'query'),ExamController.examList);
router.get('/exam-details/:id',AuthenticationMiddleware.authenticateRequestAPI,ExamController.examDetails);
router.get('/question-list/:id',AuthenticationMiddleware.authenticateRequestAPI,ExamController.questionsList);
router.post('/submit-exam/:id', AuthenticationMiddleware.authenticateRequestAPI,validRequest.validate(UserValidation.submitExam, 'body'), ExamController.submitExam); // Submit exam
router.get('/result-details/:id',AuthenticationMiddleware.authenticateRequestAPI,ExamController.viewResultDetails);
router.get('/results-list',AuthenticationMiddleware.authenticateRequestAPI,ExamController.viewResultList);
router.post('/start-exam',AuthenticationMiddleware.authenticateRequestAPI,ExamController.startExam);
router.get('/view-answers-list/:exam_conducted_id',AuthenticationMiddleware.authenticateRequestAPI,ExamController.viewAnswer);

// ######################## prior exams #####################

router.get('/prior-exam',AuthenticationMiddleware.authenticateRequestAPI,PeriorYearExamController.previousExams);
router.get('/prior-exam-questions/:exam_id',AuthenticationMiddleware.authenticateRequestAPI,PeriorYearExamController.questionsList);
router.post('/view-answer',AuthenticationMiddleware.authenticateRequestAPI,PeriorYearExamController.viewAnswer);

module.exports = router;