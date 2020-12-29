import { Request, Response } from "express";
import * as Joi from "joi";
import validation from "./validation";

export const validateCreate = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    title: Joi.string().max(255).required(),
    description: Joi.string().min(1).max(255).required(),
    content: Joi.string().required(),
    thumbnail: Joi.string().max(800).allow(null).allow(""),
    category_idx: Joi.number().integer(),
  });

  return validation(req, res, schema);
};

export const validateModify = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    title: Joi.string().min(1).max(255),
    description: Joi.string().max(255),
    content: Joi.string(),
    thumbnail: Joi.string().max(800).allow(null).allow(""),
    category_idx: Joi.number().integer(),
    is_temp: Joi.boolean(),
  });

  return validation(req, res, schema);
};

export const validateCreateTemp = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    title: Joi.string().max(255).required(),
    content: Joi.string().min(1).max(255).required(),
    thumbnail: Joi.string().max(800).allow(null).allow(""),
    category_idx: Joi.number().integer().allow(null).allow(""),
    description: Joi.string().max(255).allow(null).allow(""),
  });

  return validation(req, res, schema);
};
