import { Request, Response } from "express";
import Joi = require("joi");
import validation from "./validation";

export const validateLogin = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    code: Joi.string().required(),
  });

  return validation(req, res, schema);
};

export const validateFcm = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    token: Joi.string().required(),
  });

  return validation(req, res, schema);
};
