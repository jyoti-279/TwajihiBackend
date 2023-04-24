
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
const ResponseMessages = require('../../ResponseMessages');

/*
|------------------------------------------------ 
| API name          :  updateProfile
| Response          :  Respective response message in JSON format
| Logic             :  Update User Profile
| Request URL       :  BASE_URL/api/
| Request method    :  PUT
| Author            :  SAYAN DE
|------------------------------------------------
*/
module.exports.ProfileDetails = (req, res) => {
    (async () => {
      let purpose = "Profile Details";
      try {
        let userID = req.headers.userID;
        let userDetails = await UserRepo.findOne({ id: userID, });
        console.log(userDetails, "det ################");
        return res.send({
          status: 200,
          msg: ResponseMessages.ProfileDetails,
          data: userDetails,
          purpose: purpose,
        });
      } catch (err) {
        console.log("Profile Details Error : ", err);
        return res.send({
          status: 500,
          msg: ResponseMessages.serverError,
          data: {},
          purpose: purpose,
        });
      }
    })();
};

/*
|------------------------------------------------ 
| API name          :  updateProfile
| Response          :  Respective response message in JSON format
| Logic             :  Update User Profile
| Request URL       :  BASE_URL/api/
| Request method    :  PUT
| Author            :  SAYAN DE
|------------------------------------------------
*/
module.exports.updateProfile = (req, res) => {
    (async () => {
      let purpose = "Update User Profile";
      try {
        let userID = req.headers.userID;
        let body = req.body;
        let userCount = await UserRepo.count({ id: userID });
        if (userCount == 0) {
          return res.send({
            status: 404,
            msg: ResponseMessages.invalidUser,
            data: {},
            purpose: purpose,
          });
        }
        if (userCount > 0) {
          let updateData = {
            full_name: body.full_name,
            email: body.email,
            phone: body.phone,
          };
          await UserRepo.update({ id: userID }, updateData);
        }
        let userDetails = await UserRepo.findOne({ id: userID, });
        console.log(userDetails, "det ################");
        return res.send({
          status: 200,
          msg: ResponseMessages.userProfileUpdate,
          data: userDetails,
          purpose: purpose,
        });
      } catch (err) {
        console.log("Profile Update Error : ", err);
        return res.send({
          status: 500,
          msg: ResponseMessages.serverError,
          data: {},
          purpose: purpose,
        });
      }
    })();
};

/*
|------------------------------------------------ 
| API name          :  change Password
| Response          :  Respective response message in JSON format
| Logic             :  Update Password
| Request URL       :  BASE_URL/api/
| Request method    :  PUT
| Author            :  SAYAN DE
|------------------------------------------------
*/
module.exports.changePassword = (req, res) => {
    (async () => {
      let purpose = "Change Password";
      try {
        let userID = req.headers.userID;
        let body = req.body;
        let userDetails = await UserRepo.findOne({ id: userID });
        if (userDetails) {
            await UserRepo.update({ id: userDetails.id },{ password: md5(body.new_password) }
            );
            return res.send({
              status: 200,
              msg: ResponseMessages.changePassword,
              data: {},
              purpose: purpose,
            });
        } else {
          return res.send({
            status: 500,
            msg: ResponseMessages.userNotFound,
            data: {},
            purpose: purpose,
          });
        }
      } catch (err) {
        console.log("Change Password ERROR : ", err);
        return res.send({
          status: 500,
          msg: ResponseMessages.serverError,
          data: {},
          purpose: purpose,
        });
      }
    })();
};


/*
|------------------------------------------------ 
| API name          :  profileImageUpdate
| Response          :  Respective response message in JSON format
| Logic             :  Update Profile Image
| Request URL       :  BASE_URL/api/update-profile-image
| Request method    :  PUT
| Author            :  SAYAN DE
|------------------------------------------------
*/
module.exports.profileImageUpdate = (req, res) => {
    (async () => {
      let purpose = "Update Profile Image";
      try {
        let userID = req.headers.userID;
        let profileImage;
        if (req.file) {
          profileImage = `${global.constants.profile_photo_url}/${req.file.filename}`;
        }
        let count = await UserRepo.count({ id: userID, });
        if (count < 1) {
          let create = {
            profile_image: profileImage
          }
          await UserRepo.create({ id: userID });
          await UserRepo.update({ id: userID }, create);
        } else {
          await UserRepo.update({ id: userID }, { profile_image: profileImage });
        }
        return res.send({
          status: 200,
          msg: ResponseMessages.porofileImageUpdate,
          data: profileImage,
          purpose: purpose,
        });
      } catch (err) {
        console.log("Image Profile ERROR : ", err);
        return res.send({
          status: 500,
          msg: ResponseMessages.serverError,
          data: {},
          purpose: purpose,
        });
      }
    })();
};