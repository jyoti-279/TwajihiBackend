/*!
 * UserController.js
 * Containing all the controller actions related to `Admin`
 * Author: 
 * Date: 24 April, 2023`
 * MIT Licensed
 */
/**
 * Module dependencies.
 * @private
 */ 

// ################################ Repositories ################################ //
const adminRepositories = require('../../repositories/AdminRepo');
const UserRepositories = require('../../repositories/UserRepo');

// ################################ Sequelize ################################ //
const sequelize = require('../../config/dbConfig').sequelize;

// ################################ Response Messages ################################ //
const responseMessages = require('../../ResponseMessages');

// ################################ NPM Packages ################################ //
const md5 = require('md5');
const jwt = require('jsonwebtoken');


// ################################ Globals ################################ //
const jwtOptionsAccess = global.constants.jwtAccessTokenOptions;
const jwtOptionsRefresh = global.constants.jwtRefreshTokenOptions;

/*
|------------------------------------------------ 
| API name          :  listUsers
| Response          :  Respective response message in JSON format
| Logic             :  Fetch Users List
| Request URL       :  BASE_URL/admin/users-list
| Request method    :  GET
| Author            :  Jyoti Vankala
|------------------------------------------------
*/
module.exports.listUsers = (req, res) => {
    (async() => {
        let purpose = "Users List"
        try {
            let queryParam = req.query;
            let where = {};
            let data = {};
            let page = queryParam.page ? parseInt(queryParam.page) : 1;
            data.limit = 20;
            data.offset = data.limit ? data.limit * (page - 1) : null;

           
            if (queryParam.search) {
                where = {   
                    $or: [{ full_name: { $like: `%${queryParam.search}%` } }, { email: { $like: `%${queryParam.search}%` } }],
                    
                }
            }

            // if (queryParam.filter) {
            //     where = {   
            //         user_type: { $ne: '1' }, 
            //         status: { $eq: queryParam.filter}
            //     }
            // }

            let userList = await UserRepositories.findAndCountAll(where, data);
       
            return res.status(200).json({
                status: 200,
                msg: responseMessages.userListAdmin,
                data: {
                    userList: userList.rows,
                    totalCount: userList.count,
               
                },
                purpose: purpose
            })
        } catch (err) {
            console.log("Users List ERROR : ", err);
            return res.status(500).send({
                status: 500,
                msg: responseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })()
}


/*
|------------------------------------------------ 
| API name          :  userStatusChange
| Response          :  Respective response message in JSON format
| Logic             :  Change User Status
| Request URL       :  BASE_URL/admin/user-status-change/:user_id
| Request method    :  PATCH
| Author            :  Jyoti Vankala
|------------------------------------------------
*/

module.exports.userStatusChange = (req, res) => {
    (async()=>{
        let purpose = "Status Change";
        try {
           
            let body = req.body;
            let userId = req.params.user_id

            let user_details = {
                status: body.status,
            }

           let userUpdate = await UserRepositories.update({id: userId},user_details);

            return res.send({
                status: 200,
                msg: responseMessages.statusChangeUser,
                data: {},
                purpose: purpose
            })
        }
        catch(err) {
            console.log(" Error : ", err);
            return res.send({
                status: 500,
                msg: responseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })()
}


/*
|------------------------------------------------ 
| API name          :  userdetails
| Response          :  Respective response message in JSON format
| Logic             :  User Details
| Request URL       :  BASE_URL/admin/user-details/:user_id
| Request method    :  GET
| Author            :  Jyoti Vankala
|------------------------------------------------
*/

module.exports.userdetails = (req, res) => {
    (async()=>{
        let purpose = "User Details";
        try {  
            let userId = req.params.user_id

            let userData = await UserRepositories.findUserWithDetails({id: userId});

            return res.send({
                status: 200,
                msg: responseMessages.userDetails,
                data: userData,
                purpose: purpose
            })
        }
        catch(err) { 
            console.log(" Error : ", err);
            return res.send({
                status: 500,
                msg: responseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })()
}

/*
|------------------------------------------------ 
| API name          :  deleteUser
| Response          :  Respective response message in JSON format
| Logic             :  Delete User
| Request URL       :  BASE_URL/admin/user-details-delete/:user_id
| Request method    :  DELETE
| Author            :  Jyoti Vankala
|------------------------------------------------
*/

module.exports.deleteUser = (req, res) => {
    (async()=>{
        let purpose = "Delete User";
        try {  
            let userId = req.params.user_id

            await UserRepositories.delete({id: userId});
            await UserRepositories.deleteUserDetails({user_id: userId});

            let notification = await NotificationsRepositories.findAll({$or:[{to_user_id: userId}, {from_user_id:userId}]})

            if(notification){
                for(let notId of notification){
                    await NotificationsRepositories.delete({id: notId.id});            
                }
            }


            return res.send({
                status: 200,
                msg: responseMessages.userDelete,
                data: {},
                purpose: purpose
            })
        }
        catch(err) {
            console.log(" Error : ", err);
            return res.send({
                status: 500,
                msg: responseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })()
}
