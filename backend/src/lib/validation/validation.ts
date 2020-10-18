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
  //   const validation = Joi.valid(body, schema);

  if (validation.error) {
    logger.yellow("[JOI] 검증 오류.", validation.error.message);

    res.status(401).json({
      status: 401,
      message: "검증 오류.",
    });

    return false;
  }

  return true;
};
