/*!
 * PriorYearExamsController.js
 * Containing all the controller actions related to `Admin`
 * Author:
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
const priorQuestionsRepo = require("../../repositories/PriorYearExamQuestionRepo");
const priorExamRepo = require("../../repositories/PriorExamRepo");
const moment = require("moment");

// ################################ Sequelize ################################ //
const sequelize = require("../../config/dbConfig").sequelize;

// ################################ Response Messages ################################ //
const responseMessages = require("../../ResponseMessages");

/*
|------------------------------------------------ 
| API name          :  createPriorYearQuestions
| Response          :  Respective response message in JSON format
| Logic             :  Create Category
| Request URL       :  BASE_URL/admin/create-exam
| Request method    :  POST
| Author            :  Jyoti Vankala
|------------------------------------------------
*/
module.exports.createPriorYearQuestions = (req, res) => {

  (async () => {
    let purpose = "Create Prior Year Questions";
    try {
      let body = req.body;
      let createData = {
        category_id: body.category_id,
        subcategory_id: body.sub_category_id,
        exam_name: body.exam_name,
        total_questions: body.total_questions,
        total_time: body.total_time,
        marks_per_question: body.marks_per_question,
        total_marks: Number(body.total_questions) * Number(body.marks_per_question),
        exam_year: moment().format('YYYY'),
      };
      let data = await priorExamRepo.create(createData);

      let questionsPromiseAll = [];
      if (body.questions.length > 0) {
        body.questions.forEach(async (element) => {
          questionsPromiseAll.push(
            new Promise(async (resolve) => {
              let questions = {
                exam_id: data.id,
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
          msg: responseMessages.createExam,
          data: {},
          purpose: purpose,
        });
      });
    } catch (e) {
      console.log("Exam Create ERROR : ", e);
      return res.status(500).send({
        status: 500,
        msg: responseMessages.serverError,
        data: {},
        purpose: purpose,
      });
    }
  })();
};

