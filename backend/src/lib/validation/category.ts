import { Request, Response } from "express";
import * as Joi from "joi";
import validation from "./validation";

export const validateCreate = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    name: Joi.string().max(40).required(),
  });

  return validation(req, res, schema);
};

export const validateModify = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    name: Joi.string().max(40).required(),
  });

  return validation(req, res, schema);
};

export const validateModifyOrderNumber = (
  req: Request,
  res: Response
): boolean => {
  const schema = Joi.object().keys({
    idx: Joi.number().required(),
    order_number: Joi.number().required(),
  });

  return validation(req, res, schema);
};
