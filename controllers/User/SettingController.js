
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

const SettingRepo = require('../../repositories/SettingsRepo');
const ResponseMessages = require('../../ResponseMessages');

/*
|------------------------------------------------ 
| API name          :  ProfileDetails
| Response          :  Respective response message in JSON format
| Logic             :  ProfileDetails
| Request URL       :  BASE_URL/api/
| Request method    :  GET
| Author            :  SAYAN DE
|------------------------------------------------
*/
module.exports.CatagoryList = (req, res) => {
    (async () => {
      let purpose = "Catagory List ";
      try {
        let catagoryList = await SettingRepo.findAllCatagory({});
        console.log(catagoryList, "det ################");
        return res.send({
          status: 200,
          msg: ResponseMessages.catagoryList,
          data: catagoryList,
          purpose: purpose,
        });
      } catch (err) {
        console.log("Catagory List Error : ", err);
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
| API name          :  ProfileDetails
| Response          :  Respective response message in JSON format
| Logic             :  ProfileDetails
| Request URL       :  BASE_URL/api/
| Request method    :  GET
| Author            :  SAYAN DE
|------------------------------------------------
*/
module.exports.SubCatagoryList = (req, res) => {
    (async () => {
      let purpose = "Sub Catagory List ";
      try {
        let id = req.params.catagory_id;
        let SubcagoryList = await SettingRepo.findAllSubCatagory({ category_id: id });
        console.log(SubcagoryList, " ################");
        return res.send({
          status: 200,
          msg: ResponseMessages.SubcatagoryList,
          data: SubcagoryList,
          purpose: purpose,
        });
      } catch (err) {
        console.log("Sub Catagory List Error : ", err);
        return res.send({
          status: 500,
          msg: ResponseMessages.serverError,
          data: {},
          purpose: purpose,
        });
      }
    })();
};


