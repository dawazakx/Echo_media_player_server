import Joi from "joi";

const generateDevice = Joi.object({
  type: Joi.string().valid("mobile", "web", "tv").messages({
    "any.only": "Device type must be one of 'mobile', 'web', or 'tv'",
  }),
  os: Joi.string().valid("android", "ios", "webOs", "tizen").messages({
    "any.only": "Device OS must be one of 'android', 'ios', 'webOs', or 'tizen'",
  }),
});

export { generateDevice };
