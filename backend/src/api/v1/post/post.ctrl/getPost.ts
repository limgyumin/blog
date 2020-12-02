import AuthRequest from "../../../../type/AuthRequest";
import { Response } from "express";
import { getRepository } from "typeorm";
import logger from "../../../../lib/logger";

import Post from "../../../../entity/Post";
import User from "../../../../entity/User";
import PostListType from "../../../../type/PostListType";
import generateURL from "../../../../lib/util/generateURL";
import Category from "../../../../entity/Category";

export default async (req: AuthRequest, res: Response) => {
  const user: User = req.user;
  const idx: number = Number(req.params.idx);

  if (isNaN(idx)) {
    logger.yellow("[GET] 검증 오류. idx is NaN");
    res.status(400).json({
      status: 400,
      message: "검증 오류.",
    });
    return;
  }

  try {
    const postRepo = getRepository(Post);
    const post: PostListType = await postRepo.findOne({
      select: [
        "idx",
        "title",
        "description",
        "content",
        "thumbnail",
        "fk_user_idx",
        "fk_category_idx",
        "created_at",
        "updated_at",
      ],
      where: {
        idx,
        is_deleted: false,
      },
    });

    if (!post) {
      logger.yellow("[GET] 글 없음.");
      res.status(404).json({
        status: 404,
        message: "글 없음.",
      });
      return;
    }

    if (post.is_temp) {
      if (!user || !user.is_admin) {
        logger.yellow("[GET] 권한 없음.");
        res.status(403).json({
          status: 403,
          message: "권한 없음.",
        });
        return;
      }
    }

    const categoryRepo = getRepository(Category);
    const category = await categoryRepo.findOne({
      select: ["name"],
      where: {
        idx: post.fk_category_idx,
      },
    });

    const userRepo = getRepository(User);
    const userInfo: User = await userRepo.findOne({
      where: {
        idx: post.fk_user_idx,
      },
    });

    delete post.fk_user_idx;
    delete post.fk_category_idx;

    post.user = userInfo;
    post.category_name = category.name;

    if (post.thumbnail) {
      post.thumbnail = generateURL(req, post.thumbnail);
    }

    logger.green("[GET] 글 조회 성공.");
    res.status(200).json({
      status: 200,
      message: "글 조회 성공.",
      data: {
        post,
      },
    });
  } catch (error) {
    logger.red("[GET] 글 조회 서버 오류.", error.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
    return;
  }
};
