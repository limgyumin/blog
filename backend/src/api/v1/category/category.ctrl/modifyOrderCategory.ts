import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Category from "../../../../entity/Category";
import logger from "../../../../lib/logger";
import { validateModifyOrderNumber } from "../../../../lib/validation/category";

export default async (req: Request, res: Response) => {
  if (!validateModifyOrderNumber(req, res)) return;

  type RequestBody = {
    order_number: number;
    idx: number;
  };

  const { order_number, idx }: RequestBody = req.body;

  try {
    const categoryRepo = getRepository(Category);
    const willUpdateCategory: Category = await categoryRepo.findOne({
      where: {
        idx,
      },
    });

    const toUpdateCategory: Category = await categoryRepo.findOne({
      where: {
        order_number,
      },
    });

    if (!willUpdateCategory || !toUpdateCategory) {
      logger.yellow("[PUT] 카테고리 없음.");
      res.status(404).json({
        status: 404,
        message: "카테고리 없음.",
      });
      return;
    }

    const categoryUpdatePromise: Promise<Category>[] = [];

    const tempOrderCategory: number = willUpdateCategory.order_number;

    willUpdateCategory.order_number = order_number;
    categoryUpdatePromise.push(categoryRepo.save(willUpdateCategory));

    toUpdateCategory.order_number = tempOrderCategory;
    categoryUpdatePromise.push(categoryRepo.save(toUpdateCategory));

    await Promise.all(categoryUpdatePromise);

    logger.green("[PUT] 카테고리 정렬 순서 변경 성공.");
    res.status(200).json({
      status: 200,
      message: "카테고리 정렬 순서 변경 성공.",
    });
  } catch (error) {
    logger.red("[PUT] 카테고리 정렬 순서 변경 서버 오류.", error.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
