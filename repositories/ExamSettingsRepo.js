const sequelize = require('../config/dbConfig').sequelize;
var {DataTypes} = require('sequelize');

const ExamSettings = require('../models/exam_settings')(sequelize, DataTypes);



// Create ExamSettings
module.exports.create = (data) => {
    return new Promise((resolve, reject) => {
        ExamSettings.create(data).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.count = (data) => {
    return new Promise((resolve, reject) => {
        ExamSettings.count(data).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.findOne = (data) => {
    return new Promise((resolve, reject) => {
        ExamSettings.findOne(data).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}


module.exports.findAll = (data) => {
    return new Promise((resolve, reject) => {
        ExamSettings.findAll(data).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}


module.exports.findAndCountAll = (data) => {
    return new Promise((resolve, reject) => {
        ExamSettings.findAndCountAll(data).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}


module.exports.update = (where, data, t = null) => {
    return new Promise((resolve, reject) => {
        let options = {
                where: where
            }
            //if trunsaction exist
        if (t != null) options.transaction = t;
        ExamSettings.update(data, options).then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err);
        })
    })
}

module.exports.delete = (where) => {
    return new Promise((resolve, reject) => {
        ExamSettings.destroy({where:where}).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}
