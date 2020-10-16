import { Request, Response } from "express";
import * as Joi from "joi";
import validation from "./validation";

export const validateProfile = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    name: Joi.string().min(1).max(255).required(),
    bio: Joi.string().min(1).max(255).required(),
  });

  return validation(req, res, schema);
};
