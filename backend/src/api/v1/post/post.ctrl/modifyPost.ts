import { Response } from "express";
import { getRepository } from "typeorm";
import Category from "../../../../entity/Category";
import Post from "../../../../entity/Post";
import User from "../../../../entity/User";
import logger from "../../../../lib/logger";
import { validateModify } from "../../../../lib/validation/post";
import AuthRequest from "../../../../type/AuthRequest";

export default async (req: AuthRequest, res: Response) => {
  if (!validateModify(req, res)) return;

  const idx: number = Number(req.params.idx);

  if (isNaN(idx)) {
    logger.yellow("[PUT] 검증 오류. idx is NaN");
    res.status(401).json({
      status: 401,
      message: "검증 오류.",
    });
    return;
  }

  type RequestBody = {
    title: string;
    description: string;
    content: string;
    thumbnail: string;
    category_idx: number;
  };

  const data: RequestBody = req.body;
  const { id } = req.user;

  try {
    const userRepo = getRepository(User);
    const user = await userRepo.findOne({
      where: { id },
    });

    if (!user) {
      logger.yellow("[PUT] 유저 없음.");
      res.status(404).json({
        status: 404,
        message: "유저 없음.",
      });
      return;
    }

    const postRepo = getRepository(Post);
    const post: Post = await postRepo.findOne({
      where: { idx, user },
    });

    if (!post) {
      logger.yellow("[PUT] 글 없음.");
      res.status(404).json({
        status: 404,
        message: "글 없음.",
      });
      return;
    }

    if (data.category_idx) {
      const categoryRepo = getRepository(Category);
      const category = await categoryRepo.findOne({
        where: { idx: data.category_idx },
      });

      if (!category) {
        logger.yellow("[PUT] 카테고리 없음.");
        res.status(404).json({
          status: 404,
          message: "카테고리 없음",
        });
        return;
      }

      post.category = category;
    }

    post.updated_at = new Date();
    post.title = data.title || post.title;
    post.description = data.description || post.description;
    post.content = data.content || post.content;
    post.thumbnail = data.thumbnail;

    await postRepo.save(post);

    logger.green("[PUT] 글 수정 성공.");
    res.status(200).json({
      status: 200,
      message: "글 수정 성공.",
    });
  } catch (error) {
    logger.red("[PUT] 글 수정 서버 오류.");
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
