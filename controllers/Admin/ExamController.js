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
const responseMessages = require('../../responseMessages');
const exams = require('../../models/exams');


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
                sub_category_id: body.sub_category_id,
                exam_name: body.exam_name,
                total_time: body.total_time,
                marks_per_question: body.marks_per_question,

            }
            let data = await examsRepo.create(createData);

            let questionsPromiseAll = [];
            if (body.questions.length > 0) {
                body.questions.forEach(async element => {
                    questionsPromiseAll.push(
                        new Promise(async (resolve) => {
                            let questions =
                            {
                                exam_id: data.id,
                                question_name: element.question_name,
                                answer_one: element.answer_one,
                                answer_two: element.answer_two,
                                answer_three: element.answer_three,
                                answer_four: element.answer_four,
                                answer_one_status: element.answer_one_status,
                                answer_two_status: element.answer_two_status,
                                answer_three_status: element.answer_three_status,
                                answer_four_status: element.answer_four_status
                            }
                            let questionList = await questionsRepo.create(questions);

                            resolve(true);
                        })
                    )
                });
            }
            Promise.all(questionsPromiseAll).then(async () => {
                return res.status(200).send({
                    status: 200,
                    msg: responseMessages.createExam,
                    data: {},
                    purpose: purpose
                })
            })
        } catch (e) {
            console.log("Exam Create ERROR : ", e);
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
        let purpose = "List Exam"
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


