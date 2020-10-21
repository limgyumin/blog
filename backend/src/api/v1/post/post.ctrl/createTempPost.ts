import AuthRequest from "../../../../type/AuthRequest";
import { Response } from "express";
import { getRepository } from "typeorm";
import Category from "../../../../entity/Category";
import Post from "../../../../entity/Post";
import User from "../../../../entity/User";
import logger from "../../../../lib/logger";
import { validateCreateTemp } from "../../../../lib/validation/post";

export default async (req: AuthRequest, res: Response) => {
  if (!validateCreateTemp(req, res)) return;

  const user: User = req.user;

  type RequestBody = {
    title: string;
    description: string;
    content: string;
    thumbnail: string;
    category_idx: number;
  };

  const data: RequestBody = req.body;

  try {
    let category: Category;

    if (data.category_idx) {
      const categoryRepo = getRepository(Category);
      const category = await categoryRepo.findOne({
        where: {
          idx: data.category_idx,
        },
      });

      if (!category) {
        logger.yellow("[POST] 카테고리 없음.");
        res.status(404).json({
          status: 404,
          message: "카테고리 없음.",
        });
        return;
      }
    }

    const postRepo = getRepository(Post);
    const post = new Post();

    post.title = data.title;
    post.description = data.description;
    post.content = data.content;
    post.is_temp = true;
    post.thumbnail = data.thumbnail;
    post.user = user;
    post.category = category;

    await postRepo.save(post);

    logger.green("[POST] 임시 글 작성 성공.");
    res.status(200).json({
      status: 200,
      message: "임시 글 작성 성공.",
    });
  } catch (error) {
    logger.red("[POST] 임시 글 작성 서버 오류.", error.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
