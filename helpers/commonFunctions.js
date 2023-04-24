// ################################ NPM Packages ################################ //
require('dotenv').config();
const nodemailer = require('nodemailer');
const firebase = require("firebase-admin");
//const UserRepo = require('../repositories/UserFcmTokenRepositories');


// module.exports.sendPushNotificationsApp = (userID, title, body, type, data = {}) => {
//     return new Promise((resolve, reject) => {
//         (async()=>{
//             let fcmTokens = "";
           
//             if(userID === 0){
//                 const userDetails = await UserRepo.findAllTokens();
//                 fcmTokens = userDetails;

//             } else{
//                 const userDetails = await UserRepo.findUserWithTokens({ id: userID });
//                 fcmTokens = userDetails.fcmTokens;
//             }

//              console.log("fcmTokens ===================== ", fcmTokens)

//             if(fcmTokens.length > 0) {
                
//                 fcmTokens.forEach(e => {
//                     let fcmData = {
//                         title: title,
//                         type: type,
//                         body: body,
//                         data: data
//                     }

//                     let messageData = { 
//                         to: e.fcmToken,
//                         data:{
//                             'result_data':JSON.stringify(fcmData)
//                         }
//                     }
//                     fcm.send(messageData, function(err, res){
//                         if (err) {
//                             console.log("Something has gone wrong!"+err)
//                         } else {
//                             console.log("Successfully sent with response: ", JSON.stringify(res))
//                         }
//                     })
//                 })
//             }
//         })()
//     })
// }


// ################################ Configurations ################################ //
const transportOptions = ({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5778914d071bee",
      pass: "066eace3c82690"
    }
  });


//Send Mail
module.exports.sendMail = (messageData) => {
    return new Promise((resolve, reject) => {
        const mailTransport = nodemailer.createTransport(transportOptions);

        const message = {
            from: `${process.env.MAIL_FROM}<${process.env.MAIL_FROM_ADDRESS}>`, // Sender address
            to: messageData.toEmail, // List of recipients
            subject: messageData.subject, // Subject line
            html: messageData.html // Html text body
        };

        mailTransport.sendMail(message, function(err, info) {
            if (err) {
                console.log("MAIL ERROR : ", err);
                reject(err);
            } else {
                console.log("INFO : ", info);
                resolve(true);
            }
        });
    })
}








