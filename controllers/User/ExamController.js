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
const examCondutedRepo = require('../../repositories/ExamConductedUserRepo');
const examSheetsRepo = require('../../repositories/ExamSheetsRepo');

const moment = require("moment");
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
module.exports.examList = (req, res) => {
    (async () => {
        let purpose = "Exams List"
        try {
            let params = req.params;
            let queryParam = req.query;
            let data = {};
            let page = queryParam.page ? parseInt(queryParam.page) : 1;
            data.limit = 20;
            data.offset = data.limit ? data.limit * (page - 1) : null;

            let where = {
                subcategory_id: params.id
            }
            let examList = await examsRepo.findAndCountAll(where, data);

            return res.status(200).json({
                status: 200,
                msg: responseMessages.examList,
                data: {
                    examList: examList.rows,
                    totalCount: examList.count
                },
                purpose: purpose
            })
        } catch (err) {
            console.log("Exams List ERROR : ", err);
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
| API name          :  examDetails
| Response          :  Respective response message in JSON format
| Logic             :  Fetch Users List
| Request URL       :  BASE_URL/api/exam-details/:id
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


/*
|------------------------------------------------ 
| API name          :  questionsList
| Response          :  Respective response message in JSON format
| Logic             :  Fetch Users List
| Request URL       :  BASE_URL/admin/questions-list/:id
| Request method    :  GET
| Author            :  Jyoti Vankala
|------------------------------------------------
*/
module.exports.questionsList = (req, res) => {
    (async () => {
        let purpose = "Questions List"
        try {
            let params = req.params;

            let where = {
                exam_id: params.id
            }
            let questionsList = await questionsRepo.findAll(where);

            return res.status(200).json({
                status: 200,
                msg: responseMessages.examList,
                data: questionsList,
                purpose: purpose
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
| API name          :  startExam
| Response          :  Respective response message in JSON format
| Logic             :  Exam Submit
| Request URL       :  BASE_URL/api/submit-exam
| Request method    :  Post
| Author            :  Jyoti Vankala
|------------------------------------------------
*/
module.exports.startExam = (req, res) => {
    (async () => {
        let purpose = "Start Exam";
        try {
            let userID = req.headers.userID;
            let body = req.body;

            let examDetails = await examsRepo.findOne({ exam_id: body.exam_id })
            let examsAttended = {
                exam_id: body.exam_id,
                user_id: userID,
                total_questions: examDetails.total_questions,
                total_attended_questions: 0,
                right_answer: 0,
                wrong_answer: 0,
                not_answer: 0,
                scored: 0,
            }

            let exams = await examCondutedRepo.create(examsAttended);

            return res.send({
                status: 200,
                msg: responseMessages.questionsSubmit,
                data: exams,
                purpose: purpose
            })

        }
        catch (err) {
            console.log("Start Exam Error : ", err);
            return res.send({
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
| API name          :  SubmitExam
| Response          :  Respective response message in JSON format
| Logic             :  Exam Submit
| Request URL       :  BASE_URL/api/submit-exam
| Request method    :  Post
| Author            :  Jyoti Vankala
|------------------------------------------------
*/
module.exports.submitExam = (req, res) => {
    (async () => {
        let purpose = "Exam Submit";
        try {
            let userID = req.headers.userID;
            let examContudedId = req.params.id
            let body = req.body;

            let questions = [];
            let t = '';
            questions = req.body.questions_answers

            let questionsPromiseAll = [];

            let examConductedDetails = await examCondutedRepo.findOne({id:examContudedId})
            let examDetails = await examsRepo.findOne({id:examConductedDetails.exam_id})

            //Add answers
            if (questions.length > 0) {
                questions.forEach(async element => {
                    questionsPromiseAll.push(
                        new Promise(async (resolve, reject) => {
                            let correct_answer = []
                            correct_answer = await questionsRepo.findOne(
                                {
                                    $or: [{ id: element.question_id, answer_one: element.answer, answer_one_status: 'right' }
                                        , { id: element.question_id, answer_two: element.answer, answer_two_status: 'right' },
                                    { id: element.question_id, answer_three: element.answer, answer_three_status: 'right' },
                                    { id: element.question_id, answer_four: element.answer, answer_four_status: 'right' },
                                    ]
                                })

                            let answers = {}
                            if(element.answer != ""){   
                             answers = {
                                exam_id: body.exam_id,
                                exam_conducted_id: examContudedId,
                                question_id: element.question_id,
                                chosen_answer: element.answer,
                                answer_status: correct_answer ? 'right' : 'wrong'
                            }
                            }
                            if(element.answer == ""){   
                                answers = {
                                   exam_id: body.exam_id,
                                   exam_conducted_id: examContudedId,
                                   question_id: element.question_id,
                                   chosen_answer: null,
                                   answer_status: "not-answered"
                               }
                            }
                            let exams = await examSheetsRepo.create(answers);
                            resolve(true);
                        })
                    )
                })
            }

            Promise.all(questionsPromiseAll).then(async () => {
                let totalAttendedQuestions = await examSheetsRepo.count({ exam_conducted_id: examContudedId, answer_status: {$ne:'not-answered'} })
                let totalRightAnswers = await examSheetsRepo.count({ exam_conducted_id: examContudedId, answer_status: 'right' })
                let totalWrongAnswers = await examSheetsRepo.count({ exam_conducted_id: examContudedId, answer_status: 'wrong' })
                let totalNotAnswered = await examSheetsRepo.count({ exam_conducted_id: examContudedId, answer_status: 'not-answered' })

                
                let examsCondutedResults = {

                    total_attended_questions: totalAttendedQuestions,
                    right_answer: totalRightAnswers,
                    wrong_answer: totalWrongAnswers,
                    not_answer: totalNotAnswered,
                    scored: Number(totalRightAnswers) * examDetails.marks_per_question,

                }

                await examCondutedRepo.update({ id: examContudedId }, examsCondutedResults);

                Promise.all([questionsPromiseAll]).then(() => {
                    return res.send({
                        status: 200,
                        msg: responseMessages.questionsSubmit,
                        data: exams,
                        purpose: purpose
                    })
                })
            }
            )
        }
        catch (err) {
            console.log("Questions Submit Error : ", err);
            return res.send({
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
| API name          :  viewResultDetails
| Response          :  Respective response message in JSON format
| Logic             :  Fetch Result Details
| Request URL       :  BASE_URL/api/result-details/:id
| Request method    :  GET
| Author            :  Jyoti Vankala
|------------------------------------------------
*/
module.exports.viewResultDetails = (req, res) => {
    (async () => {
        let purpose = "Views Result Details"
        try {
            let params = req.params;

            let where = {
                id: params.id
            }
            let examResultDetails = await examCondutedRepo.findOne(where);

            return res.status(200).json({
                status: 200,
                msg: responseMessages.examResultDetails,
                data: examResultDetails,
                purpose: purpose
            })
        } catch (err) {
            console.log("Exams Result Details ERROR : ", err);
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
| API name          :  viewResultList
| Response          :  Respective response message in JSON format
| Logic             :  Fetch Result Details
| Request URL       :  BASE_URL/api/result-list/:id
| Request method    :  GET
| Author            :  Jyoti Vankala
|------------------------------------------------
*/
module.exports.viewResultList = (req, res) => {
    (async () => {
        let purpose = "Views Result List"
        try {
            let userID = req.headers.userID;

            let examResultList = await examCondutedRepo.findAll({ user_id: userID });

            return res.status(200).json({
                status: 200,
                msg: responseMessages.examResultList,
                data: examResultList,
                purpose: purpose
            })
        } catch (err) {
            console.log("Exams Result List ERROR : ", err);
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
| Logic             :  Fetch Result Details
| Request URL       :  BASE_URL/api/result-details/:id
| Request method    :  GET
| Author            :  Jyoti Vankala
|------------------------------------------------
*/
module.exports.viewAnswer = (req, res) => {
    (async () => {
        let purpose = "Answers List"
        try {

            let exam_conducted_id = req.params.exam_conducted_id;

            let answerList = await examSheetsRepo.findAll({ exam_conducted_id: exam_conducted_id });

            let answers = []

            let PromiseAll = [];
            answerList.forEach(async element => {
                PromiseAll.push(
                    new Promise(async (resolve, reject) => {

                        let correct_answer = await questionsRepo.findOne({ id: element.id })
                        answers.push({
                            id: element.id,
                            exam_conducted_id: element.exam_conducted_id,
                            question_id: element.question_id,
                            chosen_answer: element.chosen_answer,
                            answer_status: element.answer_status,
                            question: correct_answer
                        })

                        resolve(true);
                    })
                )
            })
            Promise.all(PromiseAll).then(() => {
                return res.status(200).json({
                    status: 200,
                    msg: responseMessages.examResultList,
                    data: answers,
                    purpose: purpose
                })
            })
        } catch (err) {
            console.log("Answer Result List ERROR : ", err);
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
| API name          :  previousExams
| Response          :  Respective response message in JSON format
| Logic             :  previousExams
| Request URL       :  BASE_URL/
| Request method    :  GET
| Author            :  
|------------------------------------------------
*/
module.exports.previousExams = (req, res) => {
    (async () => {
        let purpose = "Questions List"
        try {

            let questions = [];
            let where = { exam_year: {$lt: moment().format('YYYY')}};
                let questionsList = await examsRepo.findAll(where);
                questionsList.forEach(element => {
                    questions.push(element)
                    
                });

                return res.status(200).json({
                    status: 200,
                    msg: responseMessages.examList,
                    data: {questions: questions},
                    purpose: purpose
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
