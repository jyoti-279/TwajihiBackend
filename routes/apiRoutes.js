const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const AuthenticationController = require('../controllers/AuthenticationController');

router.post('/registration',AuthenticationController.Registeration);

module.exports = router;