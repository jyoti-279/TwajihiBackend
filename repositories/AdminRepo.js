const sequelize = require('../config/dbConfig').sequelize;
var {DataTypes} = require('sequelize');

const Admin = require('../models/admins')(sequelize, DataTypes);

// const tokens = require('../models/Admin_fcm_tokens')(sequelize, DataTypes);




// Create Admin
module.exports.create = (data) => {
    return new Promise((resolve, reject) => {
        Admin.create(data).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.count = (data) => {
    return new Promise((resolve, reject) => {
        Admin.count(data).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.findOne = (data) => {
    return new Promise((resolve, reject) => {
        Admin.findOne(data).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}


module.exports.findAll = (data) => {
    return new Promise((resolve, reject) => {
        Admin.findAll(data).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}


module.exports.findAndCountAll = (data) => {
    return new Promise((resolve, reject) => {
        Admin.findAndCountAll(data).then(result => {
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
        Admin.update(data, options).then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err);
        })
    })
}

module.exports.delete = (where) => {
    return new Promise((resolve, reject) => {
        Admin.destroy({where:where}).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}
