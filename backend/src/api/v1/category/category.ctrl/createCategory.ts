import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Category from "../../../../entity/Category";
import logger from "../../../../lib/logger";
import { validateCreate } from "../../../../lib/validation/category";

export default async (req: Request, res: Response) => {
  if (!validateCreate(req, res)) return;

  type RequestBody = {
    name: string;
  };
  const { name }: RequestBody = req.body;

  try {
    const categoryRepo = getRepository(Category);
    const isExist: Category = await categoryRepo.findOne({
      where: { name },
    });

    if (isExist) {
      logger.yellow("[POST] 중복된 카테고리.");
      res.status(409).json({
        status: 409,
        message: "중복된 카테고리.",
      });
      return;
    }

    const category = new Category();
    category.name = name;

    await categoryRepo.save(category);
    logger.green("[POST] 카테고리 생성 성공.");
    res.status(200).json({
      status: 200,
      message: "카테고리 생성 성공.",
    });
  } catch (error) {
    logger.red("[PUT] 카테고리 생성 서버 오류.", error.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
