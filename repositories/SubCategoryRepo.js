const sequelize = require('../config/dbConfig').sequelize;
var DataTypes = require('sequelize/lib/data-types');
const SubCategory = require('../models/sub_categories')(sequelize, DataTypes);


//Find One
module.exports.findOne = () => {
    return new Promise((resolve, reject) => {
        SubCategory.findOne({
            where: {id: 1}
        }).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.findOneSubCategory = (where,data) => {
    return new Promise((resolve, reject) => {
        SubCategory.findOne({where: where}).then(result => {
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

        SubCategory.create(whereData, options).then(result => {
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
        SubCategory.findAll({
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

        SubCategory.update(data, options).then(result => {
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
        SubCategory.findAndCountAll({
            where: whereData,
        }).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}


module.exports.count = (whereData, data) => {
    return new Promise((resolve, reject) => {
        SubCategory.count({
            where: whereData,
        }).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.delete = (where) => {
    return new Promise((resolve, reject) => {
        SubCategory.destroy({where:where}).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}