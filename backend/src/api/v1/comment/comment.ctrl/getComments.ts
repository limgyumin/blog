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
    });

    for (let i in comments) {
      const replyRepo = getRepository(Reply);
      const reply_count: number = await replyRepo.count({
        where: {
          comment: comments[i],
        },
      });

      const userRepo = getRepository(User);
      const user: User = await userRepo.findOne({
        idx: comments[i].fk_user_idx,
      });

      comments[i].reply_count = reply_count;
      comments[i].user_name = user.name;
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
