import Joi from "joi";

const connectX = Joi.object({
  device: Joi.object({
    id: Joi.string().required().messages({
      "any.required": "Device ID is required",
      "string.empty": "Device ID must not be empty",
    }),
    type: Joi.string().required().messages({
      "any.required": "Device type is required",
      "string.empty": "Device type must not be empty",
    }),
  })
    .required()
    .messages({
      "any.required": "Device object is required",
    }),
  nickname: Joi.string().required().messages({
    "any.required": "Nickname is required",
    "string.empty": "Nickname must not be empty",
  }),
  username: Joi.string().required().messages({
    "any.required": "Username is required",
    "string.empty": "Username must not be empty",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
    "string.empty": "Password must not be empty",
  }),
  url: Joi.string().required().messages({
    "any.required": "URL is required",
    "string.empty": "URL must not be empty",
  }),
});

export { connectX };
