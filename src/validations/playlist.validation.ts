import Joi from "joi";

const connectX = Joi.object({
  device_id: Joi.string().required().messages({
    "any.required": "Nickname is required",
  }),
  nickname: Joi.string().required().messages({
    "any.required": "Nickname is required",
  }),
  username: Joi.string().required().messages({
    "any.required": "Username is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
  url: Joi.string().required().messages({
    "any.required": "URL is required",
  }),
});

export { connectX };
