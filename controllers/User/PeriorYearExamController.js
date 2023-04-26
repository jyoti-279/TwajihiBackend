/*!
 * SettingsController.js
 * Containing all the controller actions related to `Admin`
 * Author: 
 * Date: 26 April, 2023`
 * MIT Licensed
 */
/**
 * Module dependencies.
 * @private
 */

// ################################ Repositories ################################ //
const subCategoryRepo = require('../../repositories/SubCategoryRepo');
const categoryRepo = require('../../repositories/CategoryRepo');
const examsRepo = require('../../repositories/PriorYearExamRepo');
const questionsRepo = require('../../repositories/PriorYearQuestionRepo');

const moment = require("moment");
// ################################ Sequelize ################################ //
const sequelize = require('../../config/dbConfig').sequelize;

// ################################ Response Messages ################################ //
const responseMessages = require('../../ResponseMessages');
const exams = require('../../models/exams');



/*
|------------------------------------------------ 
| API name          :  previousExams
| Response          :  Respective response message in JSON format
| Logic             :  previousExams
| Request URL       :  BASE_URL/
| Request method    :  GET
| Author            :  Sayan De
|------------------------------------------------
*/
module.exports.previousExams = (req, res) => {
    (async () => {
        let purpose = "Previous Exams List"
        try {

            let questions = [];
            let where = { exam_year: {$lt: moment().format('YYYY')}};
                let questionsList = await examsRepo.findAll(where);
                questionsList.forEach(element => {
                    questions.push(element)
                    
                });

                return res.status(200).json({
                    status: 200,
                    msg: responseMessages.periorExam,
                    data: {questions: questions},
                    purpose: purpose
                })
        } catch (err) {
            console.log("Perior Exam List ERROR : ", err);

            return res.status(500).send({
                status: 500,
                msg: responseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })()
}

/*
|------------------------------------------------ 
| API name          :  questionsList
| Response          :  Respective response message in JSON format
| Logic             :  questionsList
| Request URL       :  BASE_URL/
| Request method    :  GET
| Author            :  Sayan De
|------------------------------------------------
*/
module.exports.questionsList = (req, res) => {
    (async () => {
        let purpose = "Questions List"
        try {
            let params = req.params;
            let question = [];
            let questionAll = [];


            let where = {
                prior_year_exam_id: params.exam_id
            }
            let questionsList = await questionsRepo.findAll(where);
            questionsList.forEach(async element =>{
                question.push(
                    new Promise(async (resolve, reject) => {
                        //let correct_answer = await questionsRepo.findOne({ id: element.id })
                        questionAll.push({
                            id: element.id,
                            question_name: element.question_name,
                            answer_one: element.answer_one,
                            answer_two: element.answer_two,
                            answer_three: element.answer_three,
                            answer_four: element.answer_four
                        })

                        resolve(true);
                    })
                )

            })

            Promise.all(questionAll).then(() => {
            return res.status(200).json({
                status: 200,
                msg: responseMessages.questionList,
                data: questionAll,
                purpose: purpose
            })
        })
        } catch (err) {
            console.log("Questions List ERROR : ", err);
            return res.status(500).send({
                status: 500,
                msg: responseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })()
}

/*
|------------------------------------------------ 
| API name          :  viewAnswer
| Response          :  Respective response message in JSON format
| Logic             :  previousExams
| Request URL       :  BASE_URL/
| Request method    :  POST
| Author            :  Sayan De
|------------------------------------------------
*/
module.exports.viewAnswer = (req, res) => {
    (async () => {
        let purpose = "View Answer"
        try {
            let body = req.body;
            let where = {
                prior_year_exam_id: body.exam_id,
                id: body.id,
            }
            let Ranswer = await questionsRepo.findOne(where);
            console.log(Ranswer,"......");

                return res.status(200).json({
                    status: 200,
                    msg: responseMessages.answerView,
                    data: {answer: Ranswer.answer},
                    purpose: purpose
                })
        } catch (err) {
            console.log("View Answer ERROR : ", err);

            return res.status(500).send({
                status: 500,
                msg: responseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })()
}
