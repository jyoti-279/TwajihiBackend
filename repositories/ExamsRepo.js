const sequelize = require('../config/dbConfig').sequelize;
var DataTypes = require('sequelize/lib/data-types');
const Exams = require('../models/exams')(sequelize, DataTypes);


//Find One
module.exports.findOne = () => {
    return new Promise((resolve, reject) => {
        Exams.findOne({
            where: {id: 1}
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
        Exams.count(data).then(result => {
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

        Exams.create(whereData, options).then(result => {
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
        Exams.findAll({
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

        Exams.update(data, options).then(result => {
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
        Exams.findAndCountAll({
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
        Exams.destroy({where:where}).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}