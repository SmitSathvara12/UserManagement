import Joi from "joi";

export const registerSchema  = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters"
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required"
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters",
      "string.empty": "Password is required"
    }),

  role: Joi.string()
    .valid("admin", "user")
    .optional()
    .messages({
      "any.only": "Role must be either 'admin' or 'user'"
    })
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string()
    .min(6)
    .required()
});