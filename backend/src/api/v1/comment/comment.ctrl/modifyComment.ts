import { Response } from "express";
import { getRepository } from "typeorm";
import Comment from "../../../../entity/Comment";
import Post from "../../../../entity/Post";
import User from "../../../../entity/User";
import logger from "../../../../lib/logger";
import { validateModify } from "../../../../lib/validation/comment";
import AuthRequest from "../../../../type/AuthRequest";

export default async (req: AuthRequest, res: Response) => {
  if (!validateModify(req, res)) return;

  const idx: number = Number(req.params.idx);
  const user: User = req.user;

  if (isNaN(idx)) {
    logger.yellow("[PUT] 검증 오류. idx is NaN");
    res.status(400).json({
      status: 400,
      message: "검증 오류.",
    });
    return;
  }

  type RequestBody = {
    content: string;
  };

  const { content }: RequestBody = req.body;

  try {
    const commentRepo = getRepository(Comment);
    const comment: Comment = await commentRepo.findOne({
      where: {
        idx,
      },
    });

    if (!comment) {
      logger.yellow("[PUT] 댓글 없음.");
      res.status(404).json({
        status: 404,
        message: "댓글 없음.",
      });
      return;
    }

    if (comment.fk_user_idx !== user.idx && !user.is_admin) {
      logger.yellow("[PUT] 권한 없음.");
      res.status(403).json({
        status: 403,
        message: "권한 없음",
      });
      return;
    }

    const postRepo = getRepository(Post);
    const post: Post = await postRepo.findOne({
      where: {
        idx: comment.fk_post_idx,
      },
    });

    if (!post) {
      logger.yellow("[PUT] 글 없음.");
      res.status(404).json({
        status: 404,
        message: "글 없음.",
      });
      return;
    }

    comment.content = content;
    comment.updated_at = new Date();

    commentRepo.save(comment);

    logger.green("[PUT] 댓글 수정 성공.");
    res.status(200).json({
      status: 200,
      message: "댓글 수정 성공.",
    });
  } catch (error) {
    logger.red("[PUT] 댓글 수정 서버 오류.", error.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
