import { Response } from "express";
import { getRepository } from "typeorm";
import Like from "../../../../entity/Like";
import Post from "../../../../entity/Post";
import User from "../../../../entity/User";
import logger from "../../../../lib/logger";
import AuthRequest from "../../../../type/AuthRequest";

export default async (req: AuthRequest, res: Response) => {
  type RequestBody = {
    post_idx: number;
  };

  const { post_idx }: RequestBody = req.body;
  const user: User = req.user;

  try {
    const postRepo = getRepository(Post);
    const post: Post = await postRepo.findOne({
      where: {
        idx: post_idx,
      },
    });

    if (!post) {
      logger.yellow("[POST] 글 없음.");
      res.status(404).json({
        status: 404,
        message: "글 없음.",
      });
      return;
    }

    const likeRepo = getRepository(Like);
    let like: Like = await likeRepo.findOne({
      where: {
        post,
        user,
      },
    });

    if (like) {
      logger.yellow("[POST] 이미 좋아요 누름.");
      res.status(400).json({
        status: 400,
        message: "이미 좋아요 누름.",
      });
      return;
    }

    like = new Like();

    like.post = post;
    like.user = user;

    await likeRepo.save(like);

    logger.green("[POST] 좋아요 생성 성공.");
    res.status(200).json({
      status: 200,
      message: "좋아요 생성 성공.",
    });
  } catch (error) {
    logger.red("[POST] 좋아요 생성 서버 오류.", error.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
