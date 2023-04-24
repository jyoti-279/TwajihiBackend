const sequelize = require('../config/dbConfig').sequelize;
var {DataTypes} = require('sequelize');

const Catagories = require('../models/categories')(sequelize, DataTypes);
const SubCatagories = require('../models/sub_categories')(sequelize, DataTypes);

module.exports.findAllCatagory = (where) => {
    return new Promise((resolve, reject) => {
        Catagories.findAll({where: where}).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.findAllSubCatagory = (where) => {
    return new Promise((resolve, reject) => {
        SubCatagories.findAll({where: where}).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}