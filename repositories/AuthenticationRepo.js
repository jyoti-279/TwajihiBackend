const sequelize = require('../config/dbConfig').sequelize;
var {DataTypes} = require('sequelize');

const User = require('../models/users')(sequelize, DataTypes);

const tokens = require('../models/user_fcm_tokens')(sequelize, DataTypes);




// Create User
module.exports.create = (data) => {
    return new Promise((resolve, reject) => {
        User.create(data).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.count = (data) => {
    return new Promise((resolve, reject) => {
        User.count(data).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.findOne = (data) => {
    return new Promise((resolve, reject) => {
        User.findOne(data).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}


module.exports.findAll = (data) => {
    return new Promise((resolve, reject) => {
        User.findAll(data).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}


module.exports.findAndCountAll = (data) => {
    return new Promise((resolve, reject) => {
        User.findAndCountAll(data).then(result => {
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
        User.update(data, options).then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err);
        })
    })
}

module.exports.delete = (where) => {
    return new Promise((resolve, reject) => {
        User.destroy({where:where}).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}
