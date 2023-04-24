const sequelize = require('../config/dbConfig').sequelize;
var DataTypes = require('sequelize/lib/data-types');

const Users = require('../models/users')(sequelize, DataTypes);


// Find All User List
module.exports.findAndCountAll = (whereData, data) => {
    return new Promise((resolve, reject) => {
        Users.findAndCountAll({
            where: whereData,
            paranoid: false,
            order: [
                ['id', 'desc']
            ],
            attributes: ['id', 'full_name', 'email', 'phone', 'profile_image', 'status'],
            offset: data.offset,
            limit: data.limit,
            
        }).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}