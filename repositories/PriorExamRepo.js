const sequelize = require('../config/dbConfig').sequelize;
const { where } = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');
const PriorYearExams = require('../models/prior_year_exams')(sequelize, DataTypes);


//Find One
module.exports.findOne = (where) => {
    return new Promise((resolve, reject) => {
        PriorYearExams.findOne({
            where: where
        }).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.count = (data) => {
    return new Promise((resolve, reject) => {
        PriorYearExams.count(data).then(result => {
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

        PriorYearExams.create(whereData, options).then(result => {
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
        PriorYearExams.findAll({
            where: whereData,
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

        PriorYearExams.update(data, options).then(result => {
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
        PriorYearExams.findAndCountAll({
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

// delete
module.exports.delete = (where) => {
    return new Promise((resolve, reject) => {
        PriorYearExams.destroy({where:where}).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}