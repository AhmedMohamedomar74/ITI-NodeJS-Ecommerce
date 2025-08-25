import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),
  description: Joi.string().max(500).optional(),
  price: Joi.number().min(0).required(),
  quantity: Joi.number().integer().min(0).default(0),
  category: Joi.string().hex().length(24).required(),
  images: Joi.array().items(Joi.string().uri()).optional(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).optional(),
  description: Joi.string().max(500).optional(),
  price: Joi.number().min(0).optional(),
  quantity: Joi.number().integer().min(0).optional(),
  category: Joi.string().hex().length(24).optional(),
  images: Joi.array().items(Joi.string().uri()).optional(),
});


