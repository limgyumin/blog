import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Category from "../../../../entity/Category";
import logger from "../../../../lib/logger";

export default async (req: Request, res: Response) => {
  const idx: number = Number(req.params.idx);

  if (isNaN(idx)) {
    logger.yellow("[GET] 검증 오류. idx is NaN.");
    res.status(401).json({
      status: 401,
      message: "검증 오류.",
    });
    return;
  }

  try {
    const categoryRepo = getRepository(Category);
    const category: Category = await categoryRepo.findOne({
      where: { idx },
    });

    if (!category) {
      logger.yellow("[GET] 카테고리 없음.");
      res.status(404).json({
        status: 404,
        message: "카테고리 없음.",
      });
      return;
    }

    logger.green("[GET] 카테고리 조회 성공.");
    res.status(200).json({
      status: 200,
      message: "카테고리 조회 성공.",
      data: {
        category,
      },
    });
  } catch (error) {
    logger.red("[GET] 카테고리 조회 서버 오류.");
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
