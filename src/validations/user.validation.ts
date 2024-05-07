import Joi from "joi";

const connectX = Joi.object({
  device: Joi.object({
    id: Joi.string().required().messages({
      "any.required": "Device ID is required",
    }),
    type: Joi.string().required().messages({
      "any.required": "Device type is required",
    }),
  })
    .required()
    .messages({
      "any.required": "Device object is required",
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
