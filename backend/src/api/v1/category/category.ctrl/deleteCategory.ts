import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Category from "../../../../entity/Category";
import logger from "../../../../lib/logger";

export default async (req: Request, res: Response) => {
  const idx: number = Number(req.params.idx);

  if (isNaN(idx)) {
    logger.yellow("[DELETE] 검증 오류. idx is NaN");
    res.status(400).json({
      status: 400,
      message: "검증 오류",
    });
    return;
  }

  try {
    const categoryRepo = getRepository(Category);
    const category: Category = await categoryRepo.findOne({
      where: {
        idx,
      },
    });

    if (!category) {
      logger.yellow("[DELETE] 카테고리 없음.");
      res.status(404).json({
        status: 404,
        message: "카테고리 없음",
      });
      return;
    }

    const deletedOrderNumber = category.order_number;

    await categoryRepo.remove(category);

    const categories: Category[] = await categoryRepo.find();

    let additionalNumber: number = 0;
    const categoryUpdatePromise: Promise<Category>[] = [];

    for (let i = 0; i < categories.length; i++) {
      const category: Category = categories[i];

      //카테고리 정렬 순서가 삭제된 카테고리 정렬 순서보다 크면
      //삭제된 카테고리 정렬 순서 + 1을 할당해줘요
      //ex) 5 > 4, 5 = 4 + 0 = 4.
      if (category.order_number > deletedOrderNumber) {
        category.order_number = deletedOrderNumber + additionalNumber;
        additionalNumber++;

        categoryUpdatePromise.push(categoryRepo.save(category));
      }
    }

    //카테고리 정렬 숫자는 unique key이므로 promise 배열에 담아둔 뒤
    //한번에 실행해야해요.
    await Promise.all(categoryUpdatePromise);

    logger.green("[DELETE] 카테고리 삭제 성공.");
    res.status(200).json({
      status: 200,
      message: "카테고리 삭제 성공.",
    });
  } catch (error) {
    logger.red("[DELETE] 카테고리 삭제 서버 오류.", error.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류",
    });
  }
};
