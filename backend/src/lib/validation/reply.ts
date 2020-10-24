import { Request, Response } from "express";
import * as Joi from "joi";
import validation from "./validation";

export const validateCreate = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    content: Joi.string().required(),
    comment_idx: Joi.number().integer().required(),
  });

  return validation(req, res, schema);
};

export const validateModify = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    content: Joi.string().required(),
  });

  return validation(req, res, schema);
};
