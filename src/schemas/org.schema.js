import Joi from "joi";

export const orgCreateSchema = Joi.object({
  body: Joi.object({
    organization_name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).required(),
});

export const orgUpdateSchema = Joi.object({
  body: Joi.object({
    organization_name: Joi.string().required(),
    new_name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).required(),
});

