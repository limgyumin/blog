import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Comment from "../../../../entity/Comment";
import Post from "../../../../entity/Post";
import Reply from "../../../../entity/Reply";
import User from "../../../../entity/User";
import logger from "../../../../lib/logger";

export default async (req: Request, res: Response) => {
  const commentIdx = req.query.comment;

  try {
    const commentRepo = getRepository(Comment);
    const comment = await commentRepo.findOne({
      where: {
        idx: commentIdx,
      },
    });

    if (!comment) {
      logger.yellow("[GET] 댓글 없음.");
      res.status(404).json({
        status: 404,
        message: "댓글 없음.",
      });
      return;
    }

    const postRepo = getRepository(Post);
    const post = await postRepo.findOne({
      where: {
        idx: comment.fk_post_idx,
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

    const replyRepo = getRepository(Reply);
    const replies: Reply[] = await replyRepo.find({
      where: {
        comment,
      },
      order: {
        created_at: "ASC",
      },
    });

    for (let i in replies) {
      const userRepo = getRepository(User);
      const user: User = await userRepo.findOne({
        where: {
          idx: replies[i].fk_user_idx,
        },
      });

      replies[i].user = user;

      delete replies[i].fk_user_idx;
      delete replies[i].fk_comment_idx;
    }

    logger.green("[GET] 답글 목록 조회 성공.");
    res.status(200).json({
      status: 200,
      message: "답글 목록 조회 성공.",
      data: {
        replies,
      },
    });
  } catch (error) {
    logger.red("[GET] 답글 목록 조회 서버 오류.", error.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
