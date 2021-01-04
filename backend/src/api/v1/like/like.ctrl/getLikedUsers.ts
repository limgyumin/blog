import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Like from "../../../../entity/Like";
import Post from "../../../../entity/Post";
import User from "../../../../entity/User";
import logger from "../../../../lib/logger";

export default async (req: Request, res: Response) => {
  const postIdx = req.query.post;

  try {
    const postRepo = getRepository(Post);
    const post: Post = await postRepo.findOne({
      where: {
        is_temp: false,
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
    const [likes, like_count]: [Like[], number] = await likeRepo.findAndCount({
      where: {
        post,
      },
    });

    const liked_users: User[] = [];

    for (let i in likes) {
      const userRepo = getRepository(User);
      const user: User = await userRepo.findOne({
        select: ["avatar", "name", "bio"],
        where: {
          idx: likes[i].fk_user_idx,
        },
      });

      liked_users.push(user);
    }

    logger.green("[GET] 좋아요 유저 조회 성공.");
    res.status(200).json({
      status: 200,
      message: "좋아요 유저 목록 조회 성공.",
      data: {
        like_count,
        liked_users,
      },
    });
  } catch (error) {
    logger.red("[GET] 좋아요 유저 조회 서버 오류.", error.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
