import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Comment from "../../../../entity/Comment";
import Post from "../../../../entity/Post";
import Reply from "../../../../entity/Reply";
import User from "../../../../entity/User";
import logger from "../../../../lib/logger";
import CommentListType from "../../../../type/CommentListType";

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

    const commentRepo = getRepository(Comment);
    const comments: CommentListType[] = await commentRepo.find({
      where: {
        post,
      },
      order: {
        created_at: "ASC",
      },
    });

    for (let comment of comments) {
      const userRepo = getRepository(User);
      const user: User = await userRepo.findOne({
        where: {
          idx: comment.fk_user_idx,
        },
      });

      comment.user = user;

      const replyRepo = getRepository(Reply);
      const [replies, replyCount]: [Reply[], number] = await replyRepo.findAndCount({
        where: {
          comment,
        },
      });

      for (let reply of replies) {
        const userRepo = getRepository(User);
        const user: User = await userRepo.findOne({
          where: {
            idx: reply.fk_user_idx,
          },
        });

        reply.user = user;
      }

      comment.reply_count = replyCount;
      comment.replies = replies;
    }

    logger.green("[GET] 댓글 목록 조회 성공.");
    res.status(200).json({
      status: 200,
      message: "댓글 목록 조회 성공.",
      data: {
        comments,
      },
    });
  } catch (error) {
    logger.red("[GET] 댓글 목록 조회 서버 오류.", error.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
