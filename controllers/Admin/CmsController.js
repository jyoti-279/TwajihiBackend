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
| API name          :  createCategory
| Response          :  Respective response message in JSON format
| Logic             :  Create Category
| Request URL       :  BASE_URL/admin/c
| Request method    :  POST
| Author            :  Sayan De
|------------------------------------------------
*/
module.exports.AddCms = (req, res) => {
    (async() => {
        let purpose = "Add CMS";
        try {
            let body = req.body;
            let createData = {
                page_name: body.page_name,
                content: body.content,
            }
            let create = await CmsRepo.create(createData);

            return res.status(200).send({
                status: 200,
                msg: responseMessages.CmsAdd,
                data: create,
                purpose: purpose
            })
        } catch (e) {
            console.log("Cms Create ERROR : ", e);
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

/*
|------------------------------------------------ 
| API name          :  createCategory
| Response          :  Respective response message in JSON format
| Logic             :  Create Category
| Request URL       :  BASE_URL/admin/c
| Request method    :  POST
| Author            :  Sayan De
|------------------------------------------------
*/
module.exports.deleteCms = (req, res) => {
    (async() => {
        let purpose = "Add CMS";
        try {
            let id = req.params.id;
            let deleteCms = await CmsRepo.delete({id: id});
            return res.status(200).send({
                status: 200,
                msg: responseMessages.cmsDelete,
                data: {},
                purpose: purpose
            })
        } catch (e) {
            console.log("Cms Delete ERROR : ", e);
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
| API name          :  createCategory
| Response          :  Respective response message in JSON format
| Logic             :  Create Category
| Request URL       :  BASE_URL/admin/c
| Request method    :  POST
| Author            :  Sayan De
|------------------------------------------------
*/
module.exports.updateCms = (req, res) => {
    (async() => {
        let purpose = "Add CMS";
        try {
            let body = req.body;
            let queryParam = req.query;
            
            let update = await CmsRepo.update({page_name: queryParam.page_name},{content: body.content});

            return res.status(200).send({
                status: 200,
                msg: responseMessages.cmsUpdate,
                data: update,
                purpose: purpose
            })
        } catch (e) {
            console.log("Cms Update ERROR : ", e);
            return res.status(500).send({
                status: 500,
                msg: responseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })()
}