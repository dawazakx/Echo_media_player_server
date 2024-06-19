import Joi from "joi";

const register = Joi.object({
  firstName: Joi.string().required().messages({
    "any.required": "First name is required",
  }),
  lastName: Joi.string().required().messages({
    "any.required": "Last name is required",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

const userOtp = Joi.object({
  otp: Joi.string().required().messages({
    "any.required": "otp is required",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
  }),
});

const userLogin = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

const resendOtpValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
  }),
});

export { register, userOtp, userLogin, resendOtpValidation };
