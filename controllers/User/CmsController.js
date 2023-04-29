/*!
 * AdminController.js
 * Containing all the controller actions related to `Admin`
 * Author: sayan de
 * Date: 29th April, 2023`
 * MIT Licensed
 */
/**
 * Module dependencies.
 * @private
 */ 
 
// ################################ Repositories ################################ //
const CmsRepo = require('../../repositories/CmsRepo');
const responseMessages = require('../../ResponseMessages');


/*
|------------------------------------------------ 
| API name          :  get cms details 
| Response          :  Respective response message in JSON format
| Logic             :  
| Request URL       :  BASE_URL/api/cms-content
| Request method    :  GET
| Author            :  sayan de
|------------------------------------------------
*/
module.exports.getCmsContent = (req, res) => {
    (async() => {
        let purpose = "Get CMS Content";
        try {
            let queryParam = req.query;
            let cmsContent = await CmsRepo.findOne({page_name: queryParam.page_name});
            console.log(queryParam)

            return res.status(200).send({
                status: 200,
                msg: responseMessages.getCmsContent,
                data: cmsContent,
                purpose: purpose
            })
        } catch (err) {
            console.log("Get CMS Content ERROR : ", err);
            return res.send({
                status: 500,
                msg: responseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })()
};