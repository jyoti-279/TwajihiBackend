const JoiBase = require('joi');
const JoiDate = require('@hapi/joi-date');
const Joi = JoiBase.extend(JoiDate); // extend Joi with Joi Date



//############################ Authentication VAlidation Schema #############################

// registration validation 
module.exports.CreateUserSchema = Joi.object().keys({
    full_name: Joi.string().required().messages({'any.required': `"full_name" is a required field`}),
    email: Joi.string().email().required().messages({'any.required': `"email" is a required field`}),
    phone: Joi.number().required().min(10)
    .messages({
        'any.required': `"phone" is a required field`,
        'number.base': `"phone" must be a number`
    }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.min': `"Password" should have a minimum length of 6 charecters`,
        }),
    confirm_password: Joi.string().valid(Joi.ref('password')).required()
        .messages({
            'any.only': `"Confirm Password" should match with "Password"`
        }),
}).with('password', 'confirm_password');


// login validation 
module.exports.loginSchema = Joi.object().keys({
    email: Joi.string().email().required().messages({'any.required': `"email" is a required field`}),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.min': `"Password" should have a minimum length of 6 charecters`,
        }),
    confirm_password: Joi.string().valid(Joi.ref('password')).required()
        .messages({
            'any.only': `"Confirm Password" should match with "Password"`
        }),
}).with('password', 'confirm_password');

// forget password validation 
module.exports.forgetPasswordSchema = Joi.object().keys({
    email: Joi.string().email().required().messages({'any.required': `"email" is a required field`}),
})

// reset password validation
module.exports.resetPasswordSchema = Joi.object().keys({
    new_password: Joi.string()
    .min(6)
    .required()
    .messages({
        'string.min': `"Password" should have a minimum length of 6 charecters`,
    }),
    confirm_password: Joi.string().valid(Joi.ref('new_password')).required()
        .messages({
            'any.only': `"Confirm Password" should match with "Password"`
        }),
    otp: Joi.number().required()
    .messages({
        'any.required': `"otp" is a required field`,
        'number.base': `"otp" must be a number` 
    })
}).with('password', 'confirm_password');


// ########################## Profile Validation #########################

//update profile
module.exports.UpdateProfileSchema = Joi.object().keys({
    full_name: Joi.string().required().messages({'any.required': `"full_name" is a required field`}),
    email: Joi.string().email().required().messages({'any.required': `"email" is a required field`}),
    phone: Joi.number().required().min(10).messages({
        'any.required': `"phone" is a required field`,
        'number.base': `"phone" must be a number`,}),
});

// change password
module.exports.ChangePasswordSchema = Joi.object().keys({
    new_password: Joi.string()
    .min(6)
    .required()
    .messages({
        'string.min': `"Password" should have a minimum length of 6 charecters`,
    }),
    confirm_password: Joi.string().valid(Joi.ref('new_password')).required()
        .messages({
            'any.only': `"Confirm Password" should match with "new_password"`
        }),

}).with('new_password', 'confirm_password');

