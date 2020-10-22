import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Category from "../../../../entity/Category";
import Post from "../../../../entity/Post";
import logger from "../../../../lib/logger";
import CategoryListType from "../../../../type/CategoryListType";

export default async (req: Request, res: Response) => {
  try {
    const categoryRepo = getRepository(Category);
    const categories: CategoryListType[] = await categoryRepo.find({
      order: {
        order_number: "ASC",
      },
    });

    let total: number = 0;

    for (let i in categories) {
      const postRepo = getRepository(Post);
      const post_count: number = await postRepo.count({
        where: {
          is_temp: false,
          category: categories[i],
        },
      });

      categories[i].post_count = post_count;
      total += post_count;
    }

    logger.green("[GET] 카테고리 목록 조회 성공.");
    res.status(200).json({
      status: 200,
      message: "카테고리 목록 조회 성공.",
      data: {
        total,
        categories,
      },
    });
  } catch (error) {
    logger.red("[GET] 카테고리 목록 조회 서버 오류.", error.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
