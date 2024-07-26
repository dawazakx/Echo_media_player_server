import Joi from "joi";

const registerAdmin = Joi.object({
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

const adminLoginValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

const subscriptionValid = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title is required",
  }),
  num_of_devices: Joi.number().required().messages({
    "any.required": "Number of device is required",
  }),
  amount: Joi.string().required().messages({
    "any.required": "Amount is required",
  }),
  description: Joi.string().required().messages({
    "any.required": "Description is required",
  }),
});

export { registerAdmin, adminLoginValidation, subscriptionValid };
