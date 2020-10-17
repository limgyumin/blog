import { Request, Response } from "express";
import * as Joi from "joi";
import validation from "./validation";

export const validateCreate = (req: Request, res: Response) => {
  const schema = Joi.object().keys({
    name: Joi.string().max(40).required(),
  });

  return validation(req, res, schema);
};

export const validateModify = (req: Request, res: Response) => {
  const schema = Joi.object().keys({
    name: Joi.string().max(40).required(),
  });

  return validation(req, res, schema);
};
