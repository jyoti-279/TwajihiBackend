/*!
 * SettingsController.js
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
const subCategoryRepo = require('../../repositories/SubCategoryRepo');
const categoryRepo = require('../../repositories/CategoryRepo');

// ################################ Sequelize ################################ //
const sequelize = require('../../config/dbConfig').sequelize;

// ################################ Response Messages ################################ //
const responseMessages = require('../../ResponseMessages');
const ResponseMessages = require('../../ResponseMessages');


/*
|------------------------------------------------ 
| API name          :  createCategory
| Response          :  Respective response message in JSON format
| Logic             :  Create Category
| Request URL       :  BASE_URL/admin/create-category
| Request method    :  POST
| Author            :  Jyoti Vankala
|------------------------------------------------
*/
module.exports.createCategory = (req, res) => {
    (async() => {
        let purpose = "Create Category";
        try {
            let body = req.body;
            let createData = {
                category_name: body.category_name,
            }
            let adData = await categoryRepo.create(createData);

            return res.status(200).send({
                status: 200,
                msg: responseMessages.createCategory,
                data: adData,
                purpose: purpose
            })
        } catch (e) {
            console.log("Category Create ERROR : ", e);
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
| API name          :  listCategories
| Response          :  Respective response message in JSON format
| Logic             :  Fetch Users List
| Request URL       :  BASE_URL/admin/category-list
| Request method    :  GET
| Author            :  Jyoti Vankala
|------------------------------------------------
*/
module.exports.listCategories = (req, res) => {
    (async() => {
        let purpose = "List Categories"
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

            let categoryList = await categoryRepo.findAndCountAll(where, data);
       
            return res.status(200).json({
                status: 200,
                msg: responseMessages.categoryListAdmin,
                data: {
                    categoryList: categoryList.rows,
                    totalCount: categoryList.count,
               
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
| API name          :  categoryDetails
| Response          :  Respective response message in JSON format
| Logic             :  Get Category By Id
| Request URL       :  BASE_URL/admin/get-category-details/:id
| Request method    :  GET
| Author            :  Jyoti Vankala
|------------------------------------------------
*/
module.exports.categoryDetails = (req, res) => {
    (async() => {
        let purpose = "Get Category Details";
        try {
            let params = req.params;
            let categoryDetails = await categoryRepo.findOne({id: params.id});

            return res.status(200).send({
                status: 200,
                msg: responseMessages.categoryDetails,
                data: categoryDetails,
                purpose: purpose
            })
        } catch (e) {
            console.log("Get Category By Id ERROR : ", e);
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
| API name          :  updateCategory
| Response          :  Respective response message in JSON format
| Logic             :  Edit Advertisement
| Request URL       :  BASE_URL/admin/category-update/:id
| Request method    :  PUT
| Author            :  Jyoti Vankala
|------------------------------------------------
*/
module.exports.updateCategory = (req, res) => {
    (async() => {
        let purpose = "Update Category";
        try {
            let body = req.body;
            
            let editData = {
                category_name: body.category_name,
            }

            let adData = await categoryRepo.update({id: req.params.id}, editData);

            return res.status(200).send({
                status: 200,
                msg: responseMessages.updateCategory,
                data: {},
                purpose: purpose
            })
        } catch (e) {
            console.log("Update Category ERROR : ", e);
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
| API name          :  createSubCategory
| Response          :  Respective response message in JSON format
| Logic             :  Create Category
| Request URL       :  BASE_URL/admin/create-sub-category
| Request method    :  POST
| Author            :  Jyoti Vankala
|------------------------------------------------
*/
module.exports.createSubCategory = (req, res) => {
    (async() => {
        let purpose = "Create Category";
        try {
            let body = req.body;
            let createData = {
                category_id: body.cat_id,
                subject_name: body.subject_name,
            }
            let adData = await subCategoryRepo.create(createData);

            return res.status(200).send({
                status: 200,
                msg: responseMessages.createSubCategory,
                data: adData,
                purpose: purpose
            })
        } catch (e) {
            console.log("Sub Category Create ERROR : ", e);
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
| API name          :  listCategories
| Response          :  Respective response message in JSON format
| Logic             :  Fetch Users List
| Request URL       :  BASE_URL/admin/category-list
| Request method    :  GET
| Author            :  Jyoti Vankala
|------------------------------------------------
*/
module.exports.listSubCategories = (req, res) => {
    (async() => {
        let purpose = "List Sub Categories"
        try {
            let queryParam = req.query;
            let where = {
                category_id: req.params.id
            };
            let data = {};
            let page = queryParam.page ? parseInt(queryParam.page) : 1;
            data.limit = 20;
            data.offset = data.limit ? data.limit * (page - 1) : null;

            let subCategoryList = await subCategoryRepo.findAndCountAll(where, data);
       
            return res.status(200).json({
                status: 200,
                msg: responseMessages.updateSubCategory,
                data: {
                    subCategoryList: subCategoryList.rows,
                    totalCount: subCategoryList.count,
               
                },
                purpose: purpose
            })
        } catch (err) {
            console.log("Sub Category List ERROR : ", err);
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
| API name          :  updateSubCategory
| Response          :  Respective response message in JSON format
| Logic             :  Edit Advertisement
| Request URL       :  BASE_URL/admin/sub-category-update/:id
| Request method    :  PUT
| Author            :  Jyoti Vankala
|------------------------------------------------
*/
module.exports.updateSubCategory = (req, res) => {
    (async() => {
        let purpose = "Update Sub Category";
        try {
            let body = req.body;
            
            let editData = {
                category_id: body.cat_id,
                category_name: body.category_name,
            }

            let adData = await subCategoryRepo.update({id: req.params.id}, editData);

            return res.status(200).send({
                status: 200,
                msg: responseMessages.updateSubCategory,
                data: {},
                purpose: purpose
            })
        } catch (e) {
            console.log("Update Sub Category ERROR : ", e);
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
| API name          :  uploadCatagoryImage
| Response          :  Respective response message in JSON format
| Logic             :  Update Profile Image
| Request URL       :  BASE_URL/api/update-profile-image
| Request method    :  PUT
| Author            :  SAYAN DE
|------------------------------------------------
*/
module.exports.uploadCatagoryImage = (req, res) => {
    (async () => {
      let purpose = "Catagory Image Upload";
      try {
        let id = req.params.id;
        let Image;
        
        if (req.file) {
          Image = `${global.constants.catagory_image_url}/${req.file.filename}`;
        }
        let count = await categoryRepo.count({ id: id });
        if (count < 1) {
          let create = {
            category_image: Image
          }
          await categoryRepo.create({ id: id });
          await categoryRepo.update({ id: id }, create);
        } else {
          await categoryRepo.update({ id: id }, { category_image: Image });
        }
        return res.send({
          status: 200,
          msg: ResponseMessages.catagoryImageUpload,
          data: Image,
          purpose: purpose,
        });
      } catch (err) {
        console.log("Image Profile ERROR : ", err);
        return res.send({
          status: 500,
          msg: ResponseMessages.serverError,
          data: {},
          purpose: purpose,
        });
      }
    })();
  };
