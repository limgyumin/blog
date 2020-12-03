import { Request, Response } from "express";
import * as Joi from "joi";
import logger from "../logger";

export default (
  req: Request,
  res: Response,
  schema: Joi.ObjectSchema<any>
): boolean => {
  const { body } = req;
  const validation = schema.validate(body);

  if (validation.error) {
    logger.yellow("[JOI] 검증 오류.", validation.error.message);

    res.status(400).json({
      status: 400,
      message: "검증 오류.",
    });

    return false;
  }

  return true;
};
