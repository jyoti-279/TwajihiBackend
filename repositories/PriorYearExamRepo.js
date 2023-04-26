const sequelize = require('../config/dbConfig').sequelize;
var DataTypes = require('sequelize/lib/data-types');
const Exam = require('../models/prior_year_exams')(sequelize, DataTypes);



module.exports.create = (data) => {
    return new Promise((resolve, reject) => {
        Exam.create(data).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.update = (whereData, data, t = null) => {
    return new Promise((resolve, reject) => {
        let options = {
            where: whereData
        }

        if (t != null) options.transaction = t;

        Exam.update(data, options).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.delete = (where) => {
    return new Promise((resolve, reject) => {
        Exam.destroy({where:where}).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}