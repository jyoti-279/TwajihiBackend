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
| Request URL       :  BASE_URL/api/registration
| Request method    :  POST
| Author            :  SAYAN DE
|------------------------------------------------
*/
module.exports.registeration = (req, res) => {
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
                let createResponse = await UserRepo.create(createData);
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

/*
|------------------------------------------------ 
| API name          :  Login
| Response          :  Respective response message in JSON format
| Logic             :  Login
| Request URL       :  BASE_URL/api/login
| Request method    :  POST
| Author            :  SAYAN DE
|------------------------------------------------
*/
module.exports.login = (req, res) => {
    (async()=>{
        let purpose = "User Login";
        try {
            let body = req.body;
            let userDet = await UserRepo.findOne({ email: body.email });
            if(!userDet) {
                return res.send({
                    status: 404,
                    msg: ResponseMessages.invalidCreds,
                    data: {},
                    purpose: purpose
                })
            }
            if(userDet.password === md5(body.password)) {
                let accessToken       = jwt.sign({ user_id: userDet.id, email: userDet.email }, jwtOptionsAccess.secret, jwtOptionsAccess.options);
                let refreshToken      = jwt.sign({ user_id: userDet.id, email: userDet.email }, jwtOptionsRefresh.secret, jwtOptionsRefresh.options);
                userDet['access_token'] = accessToken;
                userDet['refresh_token'] = refreshToken;

                // if(body.fcmToken){
                //     let createFcmData = {
                //         user_id: userDet.id,
                //         fcmToken: body.fcmToken
                //     }
                //     let fcmTokenCount = await UserRepo.countUserFcm({ user_id: userDet.id, fcmToken: body.fcmToken });
                //     if(fcmTokenCount == 0) {
                //         let createFcmToken = await UserRepo.createUserFcm(createFcmData);
                //     }
                // }
                // else{
                //     let createFcmData = {
                //         user_id: userDet.id,
                //         fcmToken: null
                //     }
                //     let createFcmToken = await UserRepo.createUserFcm(createFcmData);
                // }

                return res.send({
                    status: 200,
                    msg: ResponseMessages.loginSuccess,
                    data: userDet ,
                    purpose: purpose
                })
            }
            else {
                return res.send({
                    status: 404,
                    msg: ResponseMessages.invalidCreds,
                    data: {},
                    purpose: purpose
                })
            }
        }
        catch(err) {
            console.log("User Login Error : ", err);
            return res.send({
                status: 500,
                msg: ResponseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })()
}

/*
|------------------------------------------------ 
| API name          :  FORGET PASSWORD 
| Response          :  Respective response message in JSON format
| Logic             :  FORGET PASSWORD
| Request URL       :  BASE_URL/api/forget-password
| Request method    :  POST
| Author            :  SAYAN DE
|------------------------------------------------
*/
module.exports.forgetPassword = (req, res) => {
    (async() => {
        let purpose = "Forget Password";
        try{
            let body = req.body;
            let userDetails = await UserRepo.findOne({email: body.email});
            if (!userDetails){
                return res.send({
                    status: 404,
                    msg: ResponseMessages.invalidUser,
                    data: {},
                    purpose: purpose
                })
            }
            const otpValue = Math.floor(1000 + Math.random() * 9000);
            let updateUser = await UserRepo.update({id: userDetails.id}, {otp: otpValue});
            if (updateUser[0] == 1){
                let mailData = {
                    toEmail: userDetails.email,
                    subject: "We sent you an OTP to reset your password",
                    html: `<body style="background: #dbdbdb;">
                            <div style="width:100%; max-width:600px; margin:0 auto; padding:40px 15px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0"
                    style="padding:15px 0;text-align: center; background:#ffffff; border-bottom: 1px solid #e2e2e2;">
                    </table>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0"
                    style="padding:60px 40px;text-align: left; background:#fff;">
                    <tr>
                        <th scope="col">
                        <p style="font-size:17px; font-weight:500; color:#000; line-height:24px;">Hi ${userDetails.full_name},</p>
                        <p style="font-size:17px; font-weight:500; color:#000; line-height:24px; margin-top: 20px;">Please use the following code to authorize your device: <strong style="font-size:20px; color:#ff301e;"> ${otpValue}</strong></p>
                        <p style="font-size:17px; font-weight:500; color:#000; line-height:24px; margin-top: 20px;">If you don't recognize this activity, please reset your password
                        immediately. You can also reach us by responding to this email.</p>
                        <p style="font-size:17px; font-weight:500; color:#000; line-height:24px; margin-top: 20px;">Thanks for your time,</p>
                        <p style="font-size:17px; font-weight:500; color:#000; line-height:24px; margin-top: 5px; font-weight: bold;">
                        Twajihi Palestine </p>
                        </th>
                    </tr>
                    </table>
                </div>
                </body>`
                }
                await commonFunction.sendMail(mailData);
                return res.send({
                    status: 200,
                    msg: ResponseMessages.otpSendEmail,
                    data: {},
                    purpose: purpose
                })
            }
        } catch (e) {
            console.log("Forgot Password ERROR : ", e);
            return res.send({
                status: 500,
                msg: ResponseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })();
}


/*
|------------------------------------------------ 
| API name          :  RESET PASSWORD 
| Response          :  Respective response message in JSON format
| Logic             :  RESET PASSWORD
| Request URL       :  BASE_URL/api/reset-password
| Request method    :  POST
| Author            :  SAYAN DE
|------------------------------------------------
*/
module.exports.resetPassword = (req, res) => {
    (async() => {
        let purpose = "Reset Password";
        try{
            let body = req.body;
            let userDetails = await UserRepo.findOne({otp: body.otp});
            if (userDetails){
                let updateUser = await UserRepo.update({id: userDetails.id}, {password: md5(body.new_password), otp: null, otp_time: null});
                console.log(updateUser);
                if (updateUser[0] == 1){
                    return res.send({
                        status: 200,
                        msg: ResponseMessages.passwordreset,
                        data: {},
                        purpose: purpose
                    })
                } else {
                    return res.send({
                        status: 500,
                        msg: ResponseMessages.resetunable,
                        data: {},
                        purpose: purpose
                    })
                }
            } else {
                return res.send({
                    status: 404,
                    msg: ResponseMessages.invalidOTP,
                    data: {},
                    purpose: purpose
                })
            }
        } catch (e) {
            console.log("Reset Password ERROR : ", e);
            return res.send({
                status: 500,
                msg: ResponseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })();
}
