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
| API name          :  createExam
| Response          :  Respective response message in JSON format
| Logic             :  Create Category
| Request URL       :  BASE_URL/admin/create-exam
| Request method    :  POST
| Author            :  Jyoti Vankala
|------------------------------------------------
*/
module.exports.createExam = (req, res) => {

  (async () => {
    let purpose = "Create Exam";
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
      let data = await examsRepo.create(createData);

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

/*
|------------------------------------------------ 
| API name          :  updateQuestion
| Response          :  Respective response message in JSON format
| Logic             :  updateQuestion
| Request URL       :  BASE_URL/admin/
| Request method    :  POST
| Author            :  Sayan De
|------------------------------------------------
*/
module.exports.updateQuestion = (req, res) => {
  (async () => {
    let purpose = "Update Questions ";
    try {
      let body = req.body;
      let id = req.params.examId;
      let questions = {
        id: body.id,
        exam_id: id,
        question_name: body.question_name,
        answer_one: body.answer_one,
        answer_two: body.answer_two,
        answer_three: body.answer_three,
        answer_four: body.answer_four,
        answer_one_status: body.answer_one_status,
        answer_two_status: body.answer_two_status,
        answer_three_status: body.answer_three_status,
        answer_four_status: body.answer_four_status,
      };
      let updateQuestion = await questionsRepo.update({ id: body.id }, questions)

      return res.status(200).send({
        status: 200,
        msg: responseMessages.updateQuestions,
        data: {},
        purpose: purpose,
      });
    } catch (e) {
      console.log("Question Update ERROR : ", e);
      return res.status(500).send({
        status: 500,
        msg: responseMessages.serverError,
        data: {},
        purpose: purpose,
      });
    }
  })();
};

/*
|------------------------------------------------ 
| API name          :  listExam
| Response          :  Respective response message in JSON format
| Logic             :  Fetch Users List
| Request URL       :  BASE_URL/admin/category-list
| Request method    :  GET
| Author            :  Jyoti Vankala
|------------------------------------------------
*/
module.exports.listExam = (req, res) => {
  (async () => {
    let purpose = "List Exam";
    try {
      let queryParam = req.query;
      let where = {};
      let data = {};
      let page = queryParam.page ? parseInt(queryParam.page) : 1;
      data.limit = 20;
      data.offset = data.limit ? data.limit * (page - 1) : null;

      // if (queryParam.search) {
      //     where = {
      //         $or: [{ full_name: { $like: `%${queryParam.search}%` } }, { email: { $like: `%${queryParam.search}%` } }],

      //     }
      // }

      let examList = await examsRepo.findAndCountAll(where, data);

      return res.status(200).json({
        status: 200,
        msg: responseMessages.examListAdmin,
        data: {
          examList: examList.rows,
          totalCount: examList.count,
        },
        purpose: purpose,
      });
    } catch (err) {
      console.log("Exams List ERROR : ", err);
      return res.status(500).send({
        status: 500,
        msg: responseMessages.serverError,
        data: {},
        purpose: purpose,
      });
    }
  })();
};

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
    let purpose = "Exams Details";
    try {
      let params = req.params;

      let where = {
        id: params.id,
      };
      let examDetails = await examsRepo.findOne(where);

      return res.status(200).json({
        status: 200,
        msg: responseMessages.examDetails,
        data: examDetails,
        purpose: purpose,
      });
    } catch (err) {
      console.log("Exams Details ERROR : ", err);
      return res.status(500).send({
        status: 500,
        msg: responseMessages.serverError,
        data: {},
        purpose: purpose,
      });
    }
  })();
};

/*
|------------------------------------------------ 
| API name          :  deleteExam
| Response          :  Respective response message in JSON format
| Logic             :  deleteExam
| Request URL       :  BASE_URL/
| Request method    :  DELETE
| Author            :  Sayan De
|------------------------------------------------
*/
module.exports.deleteExam = (req, res) => {
    (async () => {
        let purpose = "Exams Delete";
        try {
          let params = req.params;
          let where = {
            id: params.id,
          };
          let examDelete = await examsRepo.delete(where);

          return res.status(200).json({
            status: 200,
            msg: responseMessages.examDelete,
            data: examDelete,
            purpose: purpose,
          });
        } catch (err) {
          console.log("Exams Delete ERROR : ", err);
          return res.status(500).send({
            status: 500,
            msg: responseMessages.serverError,
            data: {},
            purpose: purpose,
          });
        }
    })();
};

/*
|------------------------------------------------ 
| API name          :  updateExam
| Response          :  Respective response message in JSON format
| Logic             :  updateExam
| Request URL       :  BASE_URL/
| Request method    :  PUT
| Author            :  Sayan De
|------------------------------------------------
*/
module.exports.updateExam = (req, res) => {
  (async () => {
    let purpose = "Exams Update";
    try {
      let params = req.params;
      let body = req.body;
      let updateData = {
        category_id: body.category_id,
        subcategory_id: body.subcategory_id,
        exam_name: body.exam_name,
        exam_year: body.exam_year,
        total_questions: body.total_questions,
        total_time: body.total_time,
        marks_per_question: body.marks_per_question,
      };
      let updateExam = await examsRepo.update({ id: params.id }, updateData);

      return res.status(200).json({
        status: 200,
        msg: responseMessages.examUpdate,
        data: updateExam,
        purpose: purpose,
      });
    } catch (err) {
      console.log("Exams Delete ERROR : ", err);
      return res.status(500).send({
        status: 500,
        msg: responseMessages.serverError,
        data: {},
        purpose: purpose,
      });
    }
  })();
};



