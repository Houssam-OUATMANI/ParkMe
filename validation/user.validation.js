const Joi = require("joi");

function userValidation(body) {
  const userSignupValidation = Joi.object({
    firstname: Joi.string().required().min(2).trim(),
    lastname: Joi.string().required().min(2).trim(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }).unknown(true);

  const userLoginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  return {
    userSignupValidation: userSignupValidation.validate(body),
    userLoginValidation: userLoginValidation.validate(body),
  };
}

module.exports = userValidation;
