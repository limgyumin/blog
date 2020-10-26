import { Response } from "express";
import { getRepository } from "typeorm";
import Like from "../../../../entity/Like";
import Post from "../../../../entity/Post";
import User from "../../../../entity/User";
import logger from "../../../../lib/logger";
import AuthRequest from "../../../../type/AuthRequest";

export default async (req: AuthRequest, res: Response) => {
  const postIdx = req.query.post;
  const user: User = req.user;

  try {
    const postRepo = getRepository(Post);
    const post = await postRepo.findOne({
      where: {
        idx: postIdx,
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

    const likeRepo = getRepository(Like);
    const like: Like = await likeRepo.findOne({
      where: {
        post,
        user,
      },
    });

    let liked = like ? true : false;

    logger.green("[GET] 좋아요 여부 조회 성공.");
    res.status(200).json({
      status: 200,
      message: "좋아요 여부 조회 성공.",
      data: {
        liked,
      },
    });
  } catch (error) {
    logger.red("[GET] 좋아요 여부 조회 서버 오류.", error.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
