const sequelize = require('../config/dbConfig').sequelize;
var DataTypes = require('sequelize/lib/data-types');
const ExamsConductedUsers = require('../models/exam_conducted_users')(sequelize, DataTypes);
const Exams = require('../models/exams')(sequelize, DataTypes);

ExamsConductedUsers.belongsTo(Exams, {foreignKey: 'exam_id', as: 'exam_details'});




//Find One
module.exports.findOne = () => {
    return new Promise((resolve, reject) => {
        ExamsConductedUsers.findOne({
            where: {id: 1}
        }).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}


//Create
module.exports.create = (whereData, t = null) => { 
    return new Promise((resolve, reject) => {
        let options = {};

        if (t != null) options.transaction = t;

        ExamsConductedUsers.create(whereData, options).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

//Find All
module.exports.findAll = (whereData, data) => {
    return new Promise((resolve, reject) => {
        ExamsConductedUsers.findAll({
            where: whereData,
            include:[
                {
                    model:Exams,
                    as:'exam_details',
                    required:false
                }
              ],
        }).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}


//Update
module.exports.update = (whereData, data, t = null) => {
    return new Promise((resolve, reject) => {
        let options = {
            where: whereData
        }

        if (t != null) options.transaction = t;

        ExamsConductedUsers.update(data, options).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}


//Find All
module.exports.findAndCountAll = (whereData, data) => {
    return new Promise((resolve, reject) => {
        ExamsConductedUsers.findAndCountAll({
            where: whereData,
            offset: data.offset,
            limit: data.limit,
            order: data.order,
        }).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}