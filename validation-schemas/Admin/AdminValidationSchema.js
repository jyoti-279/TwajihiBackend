const JoiBase = require('joi');
const JoiDate = require('@hapi/joi-date');
const Joi = JoiBase.extend(JoiDate); // extend Joi with Joi Date

// Login Schema
module.exports.loginSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
});

// Update CMS Schema
module.exports.updateCmsSchema = Joi.object().keys({
    page_name: Joi.string().required(),
    content: Joi.string().required()
});

// Get CMS Schema
module.exports.getCmsSchema = Joi.object().keys({
    page_name: Joi.string().required()
});  


// User status Change Schema
module.exports.ownerApprovalStatus = Joi.object().keys({
  is_active: Joi.string().required(),
}); 

// Login Schema
module.exports.catgorySchema = Joi.object().keys({
    category_name: Joi.string().required(),
   
});

// Login Schema
module.exports.subCatgorySchema = Joi.object().keys({
    cat_id: Joi.string().required(),
    subject_name: Joi.string().required(),
   
});


// Login Schema
module.exports.examSchema = Joi.object().keys({
    category_id: Joi.string().required(),
    sub_category_id: Joi.string().required(),
    exam_name: Joi.string().required(),
    total_time: Joi.string().required(),
    total_questions: Joi.string().required(),
    marks_per_question: Joi.string().required(),
    questions: Joi.array().required()
});


// User status Change Schema
module.exports.ownerDeclineStatus = Joi.object().keys({
    is_active: Joi.string().required(),
    decline_reason: Joi.string().allow('', null),
  }); 

// List User Schema
module.exports.listUserSchema = Joi.object().keys({
    page: Joi.number().min(1).required(),
    search: Joi.string().required().allow('', null),
   
});



// User status Change Schema
  module.exports.userStatusChange = Joi.object().keys({
    status: Joi.string().required(),
  });

// User status Change Schema
module.exports.hotelStatusChange = Joi.object().keys({
    is_active: Joi.string().required(),
  });  
  


// Post Popular Places Schema
module.exports.popularPlacesSchema = Joi.object().keys({
    country_id: Joi.number().required(),
    region_id : Joi.number().required(),
    district_id: Joi.number().required(),
    images: Joi.array().required(),
    name: Joi.string().required(),
    address: Joi.string().required(),
    opening_time: Joi.string().allow('',null),
    closing_time: Joi.string().allow('',null),
    entry_fee: Joi.string().allow('',null),
    place_details: Joi.string().allow('',null),
    latitude: Joi.string().required(),
    longitude: Joi.string().required(),
    tags: Joi.string().allow('',null)
});

module.exports.listPopularPlaces = Joi.object().keys({
   page: Joi.number().min(1).required(),
   search: Joi.string().required().allow('', null), 
})

//Adverstisement Create Schema
module.exports.createAdSchema = Joi.object().keys({
    line_one_status: Joi.string().valid('0', '1').required(),
    line_two_status: Joi.string().valid('0', '1').required(),
    line_three_status: Joi.string().valid('0', '1').required(),
    line_four_status: Joi.string().valid('0', '1').required(),
    banner_image: Joi.string().required(),
    line_one: Joi.string().required(),
    line_two: Joi.string().required(),
    line_three: Joi.string().required(),
    line_four: Joi.string().required(),
    is_active: Joi.string().valid('0', '1', '2').required(),
    is_publish: Joi.string().valid('0', '1').required()
})

//Adverstisement Edit Schema
module.exports.editAdSchema = Joi.object().keys({
    id: Joi.number().required(),
    line_one_status: Joi.string().valid('0', '1').required(),
    line_two_status: Joi.string().valid('0', '1').required(),
    line_three_status: Joi.string().valid('0', '1').required(),
    line_four_status: Joi.string().valid('0', '1').required(),
    banner_image: Joi.string().required(),
    line_one: Joi.string().required(),
    line_two: Joi.string().required(),
    line_three: Joi.string().required(),
    line_four: Joi.string().required(),
    is_active: Joi.string().valid('0', '1', '2').required(),
    is_publish: Joi.string().valid('0', '1').required()
})



//Advertisement Pagination
module.exports.getAllAdSchema = Joi.object().keys({
    page: Joi.number().min(1).required(),
    search: Joi.string().allow('', null)
})



//Publish Unpublish Schema
module.exports.publishSchema = Joi.object().keys({
    id: Joi.number().required(),
    is_active: Joi.string().valid('0', '1').required()
})

//Support List Schema
module.exports.supportListSchema = Joi.object().keys({
    page: Joi.number().min(1).required(),
    filter: Joi.string().allow('',null),
    search: Joi.string().allow('', null)
})

//Advertisement Update Schema
module.exports.updateAdFeesSchema = Joi.object().keys({
    id: Joi.number().required(),
    offer_amount: Joi.number().required()
})

//Advertisement Create Schema
module.exports.createAdFeesSchema = Joi.object().keys({
    offer_amount: Joi.number().required()
})


//Update Admin Password Schema
module.exports.updatePasswordSchema = Joi.object().keys({
    old_password: Joi.string().required(),
    password: Joi.string().min(6).required(),
    confirm_password: Joi.string().valid(Joi.ref('password')).required()
        .messages({
            'any.only': `"Confirm Password" should match with "Password"`
        })
}).with('password', 'confirm_password')

//Update Admin Details
module.exports.updateAdminSchema = Joi.object().keys({
    full_name: Joi.string().required(),
    dob: Joi.string().required(),
    email: Joi.string().required(),
    address: Joi.string().required(),
    country: Joi.string().required(),
    phone: Joi.string().required(),
    gender: Joi.string().required(),
    profile_image: Joi.string().required(),
})

//Revenue In Range Schema
module.exports.revenueInRangeSchema = Joi.object().keys({
    start_date: Joi.string().required().allow('', null),
    end_date: Joi.string().required().allow('', null)
})


//Advertisement Pagination
module.exports.alertList = Joi.object().keys({
    page: Joi.number().allow('',null),
 
})


//Subscription Create Schema
module.exports.createValidationSchema = Joi.object().keys({
    plan_name: Joi.string().required(),
    plan_price: Joi.string().required(),
    plan_duration: Joi.string().required(),


})


//subscription Approval Schema
module.exports.subscriptionApprovalSchema = Joi.object().keys({
    approval_status: Joi.string().required(),
    business_id: Joi.number().required(),
    subscription_id: Joi.number().required().allow('', null),
    busi_item_id: Joi.number().required(),
    business_type: Joi.string().required()
})


//Subscription Change Status
module.exports.subscriptionStatusChange = Joi.object().keys({
    status: Joi.string().required(),
 
})

//Subscription List Schema
module.exports.subscriptionListSchema = Joi.object().keys({
    type: Joi.string().required(),
})


//Transaction History List Schema
module.exports.transactionHistoryListSchema = Joi.object().keys({
    page: Joi.string().required().allow('', null),
    type: Joi.string().required().allow('', null),
    start_date: Joi.string().required().allow('', null),
    end_date: Joi.string().required().allow('', null),
})


// Offer plan status Change Schema
module.exports.offerStatusChange = Joi.object().keys({
    plan_status: Joi.number().required(),
    plan_price: Joi.number().required(),
    user_id: Joi.number().required()
  });  
  
//Admin Update Schema
module.exports.updateAdminFeesSchema = Joi.object().keys({
    id: Joi.number().required(),
    admin_amount: Joi.number().required()
})

//Admin Create Schema
module.exports.createAdminFeesSchema = Joi.object().keys({
    admin_amount: Joi.number().required()
})




