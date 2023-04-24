const jwt = require('jsonwebtoken');
const responseMessages = require('../ResponseMessages');

// ################################ Repositories ################################ //

const authRepo = require('../repositories/AuthenticationRepo');
const adminAuth =require('../repositories/AdminRepo');
// ################################ Globals ################################ //
const jwtOptionsAccess = global.constants.jwtAccessTokenOptions;

//User Authentication
module.exports.authenticateRequestAPI = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            let accessToken = req.headers.authorization.split(' ')[1];
            jwt.verify(accessToken, jwtOptionsAccess.secret, async (err, decodedToken) => {
                if (err) {
                    return res.json({
                        status: 401,
                        msg: responseMessages.authFailure,
                    })
                }
                else {
                    let userCount = await authRepo.findOne({id: decodedToken.user_id});
                    
                    if(userCount) {
                        req.headers.userID = decodedToken.user_id;
                        next();
                    } else{
                        return res.json({
                            status: 401,
                            msg: responseMessages.authFailure,
                        })
                    }
                }
            });
        } else {
            return res.json({
                status: 401,
                msg: responseMessages.authRequired,
            })
        }
    }
    catch (e) {
        console.log("Middleware Error : ", e);
        res.json({
            status: 500,
            message: responseMessages.serverError,
        })
    }
}


//Admin Authentication
module.exports.authenticateAdminRequestAPI = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            let accessToken = req.headers.authorization.split(' ')[1];
            jwt.verify(accessToken, jwtOptionsAccess.secret, async (err, decodedToken) => {
                if (err) {
                    return res.json({
                        status: 401,
                        msg: responseMessages.authFailure,
                    })
                }
                else {
                    let adminCount = await adminAuth.findOne({id: decodedToken.user_id});
                    if(adminCount) {
                        req.headers.userID = decodedToken.user_id;
                        next();
                    }
                    else{
                        return res.json({
                            status: 401,
                            msg: responseMessages.authFailure,
                        })
                    }
                }
            });
        }
        else {
            return res.json({
                status: 401,
                msg: responseMessages.authRequired,
            })
        }
    }
    catch (e) {
        console.log("Middleware Error : ", e);
        res.json({
            status: 500,
            message: responseMessages.serverError,
        })
    }
}


//User Optional Authentication
module.exports.authenticateOptionalRequestAPI = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            let accessToken = req.headers.authorization.split(' ')[1];
            jwt.verify(accessToken, jwtOptionsAccess.secret, async (err, decodedToken) => {
                if (err) {
                    return res.json({
                        status: 401,
                        msg: responseMessages.authFailure,
                    })
                }
                else {
                    let userCount = await authRepo.findOne({id: decodedToken.user_id});
                    if(userCount) {
                        req.headers.userID = decodedToken.user_id;
                        next();
                    }
                    else{
                        return res.json({
                            status: 401,
                            msg: responseMessages.authFailure,
                        })
                    }
                }
            });
        }
        else {
            req.headers.userID =null;
            next();
        }
    }
    catch (e) {
        console.log("Middleware Error : ", e);
        res.json({
            status: 500,
            message: responseMessages.serverError,
        })
    }
} 