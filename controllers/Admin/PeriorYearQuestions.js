/*!
 * SettingsController.js
 * Containing all the controller actions related to `Admin`
 * Author: SAYAN DE
 * Date: 25 April, 2023`
 * MIT Licensed
 */
/**
 * Module dependencies.
 * @private
 */

// ################################ Repositories ################################ //
const subCategoryRepo = require("../../repositories/SubCategoryRepo");
const categoryRepo = require("../../repositories/CategoryRepo");
const examsRepo = require("../../repositories/ExamsRepo");
const questionsRepo = require("../../repositories/QuestionsRepo");
const moment = require("moment");

// ################################ Sequelize ################################ //
const sequelize = require("../../config/dbConfig").sequelize;

// ################################ Response Messages ################################ //
const responseMessages = require("../../ResponseMessages");
const exams = require("../../models/exams");

/*
|------------------------------------------------ 
| API name          :  AddQuestions
| Response          :  Respective response message in JSON format
| Logic             :  AddQuestions
| Request URL       :  BASE_URL/admin/
| Request method    :  POST
| Author            :  Sayan De
|------------------------------------------------
*/
module.exports.AddQuestions = (req, res) => {
    (async () => {
      let purpose = "Add Questions ";
      try {
        let body = req.body;
        let id = req.params.examId;
        let questionsPromiseAll = [];
        if (body.questions.length > 0) {
          body.questions.forEach(async (element) => {
            questionsPromiseAll.push(
              new Promise(async (resolve) => {
                //let data = await questionsRepo.create({exam_id: id});
                let questions = {
                  exam_id: id,
                  question_name: element.question_name,
                  answer_one: element.answer_one,
                  answer_two: element.answer_two,
                  answer_three: element.answer_three,
                  answer_four: element.answer_four,
                  answer_one_status: element.answer_one_status,
                  answer_two_status: element.answer_two_status,
                  answer_three_status: element.answer_three_status,
                  answer_four_status: element.answer_four_status,
                };
                let questionList = await questionsRepo.create(questions);
  
                resolve(true);
              })
            );
          });
        }
        Promise.all(questionsPromiseAll).then(async () => {
          return res.status(200).send({
            status: 200,
            msg: responseMessages.createQuestions,
            data: {},
            purpose: purpose,
          });
        });
      } catch (e) {
        console.log("Question Add ERROR : ", e);
        return res.status(500).send({
          status: 500,
          msg: responseMessages.serverError,
          data: {},
          purpose: purpose,
        });
      }
    })();
  };
  