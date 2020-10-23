import { Response } from "express";
import { getRepository } from "typeorm";
import Comment from "../../../../entity/Comment";
import User from "../../../../entity/User";
import logger from "../../../../lib/logger";
import AuthRequest from "../../../../type/AuthRequest";

export default async (req: AuthRequest, res: Response) => {
  const idx: number = Number(req.params.idx);

  if (isNaN(idx)) {
    logger.yellow("[DELETE] 검증 오류. idx is NaN");
    res.status(400).json({
      status: 400,
      message: "검증 오류.",
    });
    return;
  }

  const user: User = req.user;

  try {
    const commentRepo = getRepository(Comment);
    const comment = await commentRepo.findOne({
      where: {
        idx,
      },
    });

    if (!comment) {
      logger.yellow("[DELETE] 댓글 없음.");
      res.status(404).json({
        status: 404,
        message: "댓글 없음.",
      });
      return;
    }

    if (comment.fk_user_idx !== user.idx && !user.is_admin) {
      logger.yellow("[DELETE] 권한 없음.");
      res.status(403).json({
        status: 403,
        message: "권한 없음",
      });
      return;
    }

    await commentRepo.remove(comment);

    logger.green("[DELETE] 댓글 삭제 성공.");
    res.status(200).json({
      status: 200,
      message: "댓글 삭제 성공.",
    });
  } catch (error) {
    logger.red("[DELETE] 댓글 삭제 서버 오류.", error.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
