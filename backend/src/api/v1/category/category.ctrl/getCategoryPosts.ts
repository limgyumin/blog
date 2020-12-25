import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Category from "../../../../entity/Category";
import Post from "../../../../entity/Post";
import logger from "../../../../lib/logger";

interface CategoryPostsType extends Category {
  posts?: Post[];
  post_count?: number;
}

export default async (req: Request, res: Response) => {
  try {
    const categoryRepo = getRepository(Category);
    const categories: CategoryPostsType[] = await categoryRepo.find({
      select: ["idx", "name"],
      order: {
        order_number: "ASC",
      },
    });

    for (let i in categories) {
      const postRepo = getRepository(Post);
      const [posts, post_count] = await postRepo.findAndCount({
        select: ["idx", "title", "created_at"],
        where: {
          is_temp: false,
          is_deleted: false,
          category: categories[i],
        },
        order: {
          created_at: "DESC",
        },
      });

      categories[i].post_count = post_count;
      categories[i].posts = posts;
    }

    logger.green("[GET] 카테고리 글 목록 조회 성공.");
    res.status(200).json({
      status: 200,
      message: "카테고리 글 목록 조회 성공.",
      data: {
        categories,
      },
    });
  } catch (error) {
    logger.red("[GET] 카테고리 글 목록 조회 서버 오류.", error.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
