/*!
 * SettingsController.js
 * Containing all the controller actions related to `Admin`
 * Author: 
 * Date: 24 April, 2023`
 * MIT Licensed
 */
/**
 * Module dependencies.
 * @private
 */

// ################################ Repositories ################################ //
const subCategoryRepo = require('../../repositories/SubCategoryRepo');
const categoryRepo = require('../../repositories/CategoryRepo');
const examsRepo = require('../../repositories/ExamsRepo');
const questionsRepo = require('../../repositories/QuestionsRepo');

// ################################ Sequelize ################################ //
const sequelize = require('../../config/dbConfig').sequelize;

// ################################ Response Messages ################################ //
const responseMessages = require('../../ResponseMessages');
const exams = require('../../models/exams');



/*
|------------------------------------------------ 
| API name          :  examDetails
| Response          :  Respective response message in JSON format
| Logic             :  Fetch Users List
| Request URL       :  BASE_URL/admin/exam-details/:id
| Request method    :  GET
| Author            :  Jyoti Vankala
|------------------------------------------------
*/
module.exports.examDetails = (req, res) => {
    (async () => {
        let purpose = "Exams Details"
        try {
            let params = req.params;
    
            let where = {
                id: params.id
            }
            let examDetails = await examsRepo.findOne(where);

            return res.status(200).json({
                status: 200,
                msg: responseMessages.examDetails,
                data: examDetails,
                purpose: purpose
            })
        } catch (err) {
            console.log("Exams Details ERROR : ", err);
            return res.status(500).send({
                status: 500,
                msg: responseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })()
}


