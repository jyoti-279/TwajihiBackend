const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// SET STORAGE Images
var storageCatagoryImage = multer.diskStorage({
    destination: function(req, file, cb) {
        const path = 'uploads/CatagoryImage';
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
    },
    filename: function(req, file, cb) {
        cb(null, 'CatagoryImage' + Date.now() + path.extname(file.originalname))
    }
})

// store sub categorie image
var storageSubCatagoryImage = multer.diskStorage({
    destination: function(req, file, cb) {
        const path = 'uploads/SubCatagoryImage';
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
    },
    filename: function(req, file, cb) {
        cb(null, 'SubCatagoryImage' + Date.now() + path.extname(file.originalname))
    }
})


var uploadCatagoryImage = multer({ storage: storageCatagoryImage });

var uploadSubCatagoryImage = multer({ storage: storageSubCatagoryImage });

/* ############################################ Middlewares ############################################ */
const validateRequest = require('../middlewares/ValidateRequest');
const authenticationMiddleware = require('../middlewares/AuthenticationMiddleware');

/* ############################################ Joi Validation Schema ############################################ */
const adminValidationSchema = require('../validation-schemas/Admin/AdminValidationSchema');


// ############################################# Controllers #############################################
const AdminController = require('../controllers/Admin/AdminController');
const userController = require('../controllers/Admin/UserController');
const SettingsController = require('../controllers/Admin/SettingsController');
const ExamsController = require('../controllers/Admin/ExamController');
const PerioryearExamController = require('../controllers/Admin/PeriorYearExamController');
const CmsController = require('../controllers/Admin/CmsController');

/* ############################################ Routes  ############################################ */
router.post('/login', validateRequest.validate(adminValidationSchema.loginSchema, 'body'), AdminController.adminLogin); // Admin Login Route

// ####################################### User ########################################## //
router.get('/users-list', authenticationMiddleware.authenticateAdminRequestAPI, validateRequest.validate(adminValidationSchema.listUserSchema, 'query'), userController.listUsers); // Fetch User List

// ######################################### Exam ######################################### //
router.post('/create-exam',authenticationMiddleware.authenticateAdminRequestAPI, validateRequest.validate(adminValidationSchema.examSchema, 'body'), ExamsController.createExam)// Create Exam
router.get('/exams-list', authenticationMiddleware.authenticateAdminRequestAPI,validateRequest.validate(adminValidationSchema.listUserSchema, 'query'), ExamsController.listExam)// Create Exam
router.get('/exams-details/:id',authenticationMiddleware.authenticateAdminRequestAPI,ExamsController.examDetails)// Exam Details
router.delete('/delete-exam/:id',authenticationMiddleware.authenticateAdminRequestAPI,ExamsController.deleteExam);
router.put('/update-exam/:id',authenticationMiddleware.authenticateAdminRequestAPI,ExamsController.updateExam);
router.post('/add-questions/:examId',authenticationMiddleware.authenticateAdminRequestAPI,ExamsController.AddQuestions);
router.put('/update-questions/:examId',authenticationMiddleware.authenticateAdminRequestAPI,ExamsController.updateQuestion);

// ####################################### Settings ########################################## //
router.get('/category-list', authenticationMiddleware.authenticateAdminRequestAPI, validateRequest.validate(adminValidationSchema.listUserSchema, 'query'), SettingsController.listCategories); // Fetch User List
router.post('/create-category', validateRequest.validate(adminValidationSchema.catgorySchema, 'body'), SettingsController.createCategory); // User Category
router.put('/update-category/:id', validateRequest.validate(adminValidationSchema.catgorySchema, 'body'), SettingsController.updateCategory); // User Category
router.post('/create-sub-category', authenticationMiddleware.authenticateAdminRequestAPI, validateRequest.validate(adminValidationSchema.subCatgorySchema, 'body'), SettingsController.createSubCategory); // Fetch User List
router.post('/upload-category-image/:id', authenticationMiddleware.authenticateAdminRequestAPI, uploadCatagoryImage.single('image'),SettingsController.uploadCatagoryImage);
router.post('/upload-subcategory-image', authenticationMiddleware.authenticateAdminRequestAPI, uploadSubCatagoryImage.single('image'),SettingsController.uploadSubCatagoryImage);
router.post('/update-subcategory/:id',authenticationMiddleware.authenticateRequestAPI,SettingsController.updateSubCategory);
router.delete('/delete-category/:id',authenticationMiddleware.authenticateRequestAPI,SettingsController.deleteCategory);
router.delete('/delete-subcategory/:id',authenticationMiddleware.authenticateRequestAPI,SettingsController.deleteSubCategory);
router.get('/sub-category-list/:category_id',authenticationMiddleware.authenticateAdminRequestAPI,SettingsController.listSubCategories);

router.put('/exam-settings-update', validateRequest.validate(adminValidationSchema.examSettings, 'body'), SettingsController.updateExamSettings); // Exam Settings
router.get('/fetch-exam-settings-details', SettingsController.fetchExamSettings); // Exam Settings

//######################################### Dashboard #####################################
router.get('/dashboard-data', authenticationMiddleware.authenticateAdminRequestAPI, AdminController.dashboardData); // Fetch Dashbord Data

// ###################################### prior year exam  ###################################

router.post('/add-perior-questions/:examId',authenticationMiddleware.authenticateAdminRequestAPI,PerioryearExamController.AddQuestions);
router.delete('/delete-perior-question',authenticationMiddleware.authenticateAdminRequestAPI,PerioryearExamController.deleteQuestion);
router.put('/update-perior-question/:examId',authenticationMiddleware.authenticateAdminRequestAPI,PerioryearExamController.updateQuestion);
router.post('/add-perior-exam',authenticationMiddleware.authenticateAdminRequestAPI,PerioryearExamController.createExam);
router.put('/update-perior-exam/:id',authenticationMiddleware.authenticateAdminRequestAPI,PerioryearExamController.updateExam);
router.delete('/delete-perior-exam/:id',authenticationMiddleware.authenticateAdminRequestAPI,PerioryearExamController.deleteExam);
router.get('/exam-list',authenticationMiddleware.authenticateAdminRequestAPI,PerioryearExamController.examList);

// ################################# CMS #################################
router.post('/add-cms',authenticationMiddleware.authenticateAdminRequestAPI,CmsController.AddCms);
router.put('/update-cms',authenticationMiddleware.authenticateAdminRequestAPI,CmsController.updateCms);
router.delete('/delete-cms/:id',authenticationMiddleware.authenticateAdminRequestAPI,CmsController.deleteCms);
router.get('/get-cms',authenticationMiddleware.authenticateAdminRequestAPI,CmsController.getCmsContent);


module.exports = router;