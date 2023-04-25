const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

/* ############################################ Routes  ############################################ */
router.post('/login', validateRequest.validate(adminValidationSchema.loginSchema, 'body'), AdminController.adminLogin); // Admin Login Route

// ####################################### User ########################################## //
router.get('/users-list', authenticationMiddleware.authenticateAdminRequestAPI, validateRequest.validate(adminValidationSchema.listUserSchema, 'query'), userController.listUsers); // Fetch User List

// ######################################### Exam ######################################### //
router.post('/create-exam',authenticationMiddleware.authenticateAdminRequestAPI, validateRequest.validate(adminValidationSchema.examSchema, 'body'), ExamsController.createExam)// Create Exam
router.get('/exams-list', authenticationMiddleware.authenticateAdminRequestAPI,validateRequest.validate(adminValidationSchema.listUserSchema, 'query'), ExamsController.listExam)// Create Exam
router.get('/exams-details/:id',authenticationMiddleware.authenticateAdminRequestAPI,ExamsController.examDetails)// Exam Details


// ####################################### Settings ########################################## //
router.get('/category-list', authenticationMiddleware.authenticateAdminRequestAPI, validateRequest.validate(adminValidationSchema.listUserSchema, 'query'), SettingsController.listCategories); // Fetch User List
router.post('/create-category', validateRequest.validate(adminValidationSchema.catgorySchema, 'body'), SettingsController.createCategory); // User Category
router.put('/update-category/:id', validateRequest.validate(adminValidationSchema.catgorySchema, 'body'), SettingsController.updateCategory); // User Category
router.post('/create-sub-category', authenticationMiddleware.authenticateAdminRequestAPI, validateRequest.validate(adminValidationSchema.subCatgorySchema, 'body'), SettingsController.createSubCategory); // Fetch User List



//######################################### Dashboard #####################################
router.get('/dashboard-data', authenticationMiddleware.authenticateAdminRequestAPI, AdminController.dashboardData); // Fetch Dashbord Data

module.exports = router;