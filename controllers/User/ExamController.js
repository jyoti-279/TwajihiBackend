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
            let queryParam  = req.query;
            let data = {};
            let page = queryParam.page ? parseInt(queryParam.page) : 1;
            data.limit = 20;
            data.offset = data.limit ? data.limit * (page - 1) : null;
            
            let where = {
                subcategory_id: params.id
            }
            let examList = await examsRepo.findAndCountAll(where,data);

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
                data:questionsList,
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
| API name          :  SubmitExam
| Response          :  Respective response message in JSON format
| Logic             :  Remaining Exam Start Time
| Request URL       :  BASE_URL/api/submit-exam
| Request method    :  Post
| Author            :  Jyoti Vankala
|------------------------------------------------
*/
module.exports.submitExam = (req, res) => {
    (async()=> {
        let purpose = "Exam Submit";
        try {
            let userID = req.headers.userID;
            let body = req.body;
            
               let examFind = await examsRepo.findOneExam({ id: body.exam_id});
                       
                let questions = [];
                let t = '';
                questions = req.body.questions_answers
        
                let questionsPromiseAll = [];
                    
                    
                //Add answers
                    if (questions.length > 0) {
                        questions.forEach(async element => { 
                                questionsPromiseAll.push( 
                                new Promise(async (resolve, reject) => {
                                let correct_answer = []  
                                correct_answer = await questionsRepo.findOne(
                                    {$or: [{id: element.question_id,answer_one:element.answer,answer_one_status:'right'}
                                     ,{id: element.question_id,answer_two:element.answer,answer_two_status:'right'},
                                     {id: element.question_id,answer_three:element.answer,answer_three_status:'right'},
                                     {id: element.question_id,answer_four:element.answer,answer_four_status:'right'},
                                     ]})
                                
                                    let answers = {
                                            exam_id: body.exam_id,
                                            user_id: userID,
                                            question_id : element.question_id,
                                            answer_correct_status: correct_answer ? 'right' : 'wrong' 
                                    }
                                    
                                    let exams = await examCondutedRepo.create(answers)
                                    resolve(true);
                                 })
                             )
                        })
                    }


                    Promise.all(questionsPromiseAll).then(async ()=>{
                    
                    
                    
                    let findRightAnswer = await examCondutedRepo.count({user_id:userID,exam_id:body.exam_id,answer_correct_status:'right'})
                    let findWrongAnswer = await examCondutedRepo.count({user_id:userID,exam_id:body.exam_id,answer_correct_status:'wrong'})
                    let findTotalQuestionsCount = await examsRepo.findOneExam({id: body.exam_id});
                    let marksFindData = "1";

                    
                    let examsAttended = {
                        exam_id: body.exam_id,
                        user_id: userID,
                        exam_conducted_starting_id: '1',
                        total_questions: findTotalQuestionsCount.no_of_questions,
                        total_attended_questions: questions.length,
                        right_answer: findRightAnswer,
                        wrong_answer: findWrongAnswer,
                        not_answer: Number(findTotalQuestionsCount.no_of_questions) - Number(questions.length),
                        score: Number(findRightAnswer) * ((marksFindData) ? Number(marksFindData.marks) : 1),
                      
                        
                    }
                
                    let exams = await examCondutedUserRepo.create(examsAttended);
                    
                    let examConductedData = await examCondutedUserRepo.findAll({exam_id: body.exam_id});

                    for(let item of examConductedData) {
                           
                        if(findRightAnswer > item.score){
                             rank =  Number(item.rank) + 1
                             await examCondutedUserRepo.update({exam_id:body.exam_id,score:item.score},{rank: rank > 0 ? rank : 1});
                             console.log("ll",item.score,rank)
                        }

                        if(findRightAnswer < item.score){

                            if(item.rank !=1){
                            rank =  Number(item.rank) - 1
                            await examCondutedUserRepo.update({exam_id:body.exam_id,score:item.score},{rank: rank > 0 ? rank : 1});
                            }
                             
                            rank =  Number(item.rank) + 1
                            await examCondutedUserRepo.update({exam_id:body.exam_id,score:findRightAnswer},{rank: rank > 0 ? rank : 1});
                            console.log("lk",item.score,rank)
                        }
    
                    }
                  
                    Promise.all([questionsPromiseAll]).then(()=>{ 
                    return res.send({
                        status: 200,
                        msg: responseMessages.questionsSubmit,
                        data: {},
                        purpose: purpose
                    })
                })
                    
                }

                )}
                catch(err) {
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