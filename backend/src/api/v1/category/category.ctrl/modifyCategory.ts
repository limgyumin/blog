import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Category from "../../../../entity/Category";
import logger from "../../../../lib/logger";
import { validateModify } from "../../../../lib/validation/category";

export default async (req: Request, res: Response) => {
  if (!validateModify(req, res)) return;

  const idx: number = Number(req.params.idx);

  if (isNaN(idx)) {
    logger.yellow("[PUT] 검증 오류. idx is NaN.");
    res.status(400).json({
      status: 400,
      message: "검증 오류.",
    });
    return;
  }

  type RequestBody = {
    name: string;
  };
  const { name }: RequestBody = req.body;

  try {
    const categoryRepo = getRepository(Category);
    const category: Category = await categoryRepo.findOne({
      where: { idx },
    });

    if (!category) {
      logger.yellow("[PUT] 카테고리 없음.");
      res.status(404).json({
        status: 404,
        message: "카테고리 없음.",
      });
      return;
    }

    const isExist: Category = await categoryRepo.findOne({
      where: { name },
    });

    if (isExist) {
      logger.yellow("[PUT] 중복된 카테고리.");
      res.status(409).json({
        status: 409,
        message: "중복된 카테고리.",
      });
      return;
    }

    category.name = name;

    await categoryRepo.save(category);

    logger.green("[PUT] 카테고리 수정 성공.");
    res.status(200).json({
      status: 200,
      message: "카테고리 수정 성공.",
    });
  } catch (error) {
    logger.red("[PUT] 카테고리 수정 서버 오류.", error.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
