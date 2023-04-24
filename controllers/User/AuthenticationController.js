
/*!
 * AuthenticationController.js
 * Containing all the controller actions related to `User`
 * Author: SAYAN DE
 * Date: 24th April, 2023`
 * MIT Licensed
 */
/**
 * Module dependencies.
 * @private
 */
// const sequelize = require('../../config/dbConfig').sequelize;
var {DataTypes} = require('sequelize');

const UserRepo = require('../../repositories/AuthenticationRepo');

const md5 = require('md5');
const jwt = require('jsonwebtoken');
const ResponseMessages = require('../../ResponseMessages');
const commonFunction = require('../../helpers/commonFunctions');


const jwtOptionsAccess = global.constants.jwtAccessTokenOptions;
const jwtOptionsRefresh = global.constants.jwtRefreshTokenOptions;

/*
|------------------------------------------------ 
| API name          :  REGISTRATION 
| Response          :  Respective response message in JSON format
| Logic             :  REGISTRATION
| Request URL       :  BASE_URL/api/
| Request method    :  POST
| Author            :  SAYAN DE
|------------------------------------------------
*/
module.exports.Registeration = (req, res) => {
    (async()=>{
        let purpose = "User Registration";
        try {
            let body = req.body;
            let userCount = await UserRepo.count({ email: body.email });
            console.log(userCount);
            if(userCount == 0) {
                let createData = {
                    full_name: body.full_name,
                    email: body.email,
                    phone: body.phone,
                    password: md5(body.password)
                }
                console.log(createData);
                let createResponse = await UserRepo.Usercreate(createData);
                let accessToken       = jwt.sign({ user_id: createResponse.id, email: createResponse.email }, jwtOptionsAccess.secret, jwtOptionsAccess.options);
                let refreshToken      = jwt.sign({ user_id: createResponse.id, email: createResponse.email }, jwtOptionsRefresh.secret, jwtOptionsRefresh.options);
                createResponse['access_token'] = accessToken;
                createResponse['refresh_token'] = refreshToken;
                // if(body.user_type == 0){
                //     message = `${body.full_name} has registered as user`
                // }
                // else{
                //     message = `${body.full_name} has registered as charity owner`
                // }
                // let notificationData = {
                //     from_user_id: 0,
                //     to_user_id: '0',
                //     alert_message: message,
                //     alert_type: 'registration',
                //     read_unread: '0',
                //     status: '1'
                // }
                // let notificationResponse = await NotificationsRepo.create(notificationData);
                //console.log(notificationResponse);
                return res.send({
                    status: 200,
                    msg: ResponseMessages.registrationSuccess,
                    data: {
                        full_name: createResponse.full_name,
                        email: createResponse.email,
                        accessToken: accessToken,
                        refreshToken: refreshToken
                        },
                    purpose: purpose
                })
            }
            else {
                return res.send({
                    status: 409,
                    msg: ResponseMessages.duplicateEmail,
                    data: {},
                    purpose: purpose
                })
            }
        }
        catch(err) {
            console.log("Registration Error : ", err);
            return res.send({
                status: 500,
                msg: ResponseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })()
}