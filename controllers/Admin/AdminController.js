/*!
 * AdminController.js
 * Containing all the controller actions related to `Admin`
 * Author: 
 * Date: 2nd August, 2022`
 * MIT Licensed
 */
/**
 * Module dependencies.
 * @private
 */ 
 
// ################################ Repositories ################################ //
const UserRepo = require('../../repositories/AuthenticationRepo');
const AdminRepo = require('../../repositories/AdminRepo');

// ################################ Sequelize ################################ //
const sequelize = require('../../config/dbConfig').sequelize;

// ################################ Response Messages ################################ //
const responseMessages = require('../../ResponseMessages');


// ################################ NPM Packages ################################ //
const md5 = require('md5');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

 
// ################################ Globals ################################ //
const jwtOptionsAccess = global.constants.jwtAccessTokenOptions;
const jwtOptionsRefresh = global.constants.jwtRefreshTokenOptions;

/*
|------------------------------------------------ 
| API name          :  adminLogin
| Response          :  Respective response message in JSON format
| Logic             :  Admin Login
| Request URL       :  BASE_URL/admin/login
| Request method    :  POST
| Author            :  Jyoti Vankala
|------------------------------------------------
*/
module.exports.adminLogin = (req, res) => {
    (async() => {
        let purpose = "Admin Login";
        try {
            let body = req.body;
            let whereData = {
                email: body.email,
                password: md5(body.password),
            }
            let userData = await AdminRepo.findOne(whereData);

            if (userData) {

                let accessToken = jwt.sign({ user_id: userData.id, email: userData.email }, jwtOptionsAccess.secret, jwtOptionsAccess.options);
                let refreshToken = jwt.sign({ user_id: userData.id, email: userData.email }, jwtOptionsRefresh.secret, jwtOptionsRefresh.options);

                delete userData.password;
            
                
                userData['access_token'] = accessToken;
                userData['refresh_token'] = refreshToken;

                return res.status(200).send({
                    status: 200,
                    msg: responseMessages.loginSuccess,
                    data: userData,
                    purpose: purpose
                })
            } else {
                return res.status(403).send({
                    status: 403,
                    msg: responseMessages.invalidCreds,
                    data: {},
                    purpose: purpose
                })
            }
        } catch (e) {
            console.log("Admin Login ERROR : ", e);
            return res.status(500).send({
                status: 500,
                msg: responseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })()
}