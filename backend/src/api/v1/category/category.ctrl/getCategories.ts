import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Category from "../../../../entity/Category";
import logger from "../../../../lib/logger";

export default async (req: Request, res: Response) => {
  try {
    const categoryRepo = getRepository(Category);
    const categories: Category[] = await categoryRepo.find();

    logger.green("[GET] 카테고리 목록 조회 성공.");
    res.status(200).json({
      status: 200,
      message: "카테고리 목록 조회 성공.",
      data: {
        categories,
      },
    });
  } catch (error) {
    logger.red("[GET] 카테고리 목록 조회 서버 오류.");
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
