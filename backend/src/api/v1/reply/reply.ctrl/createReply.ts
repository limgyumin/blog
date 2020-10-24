import { Response } from "express";
import { date } from "joi";
import { getRepository } from "typeorm";
import Comment from "../../../../entity/Comment";
import Reply from "../../../../entity/Reply";
import User from "../../../../entity/User";
import logger from "../../../../lib/logger";
import { validateCreate } from "../../../../lib/validation/reply";
import AuthRequest from "../../../../type/AuthRequest";

export default async (req: AuthRequest, res: Response) => {
  if (!validateCreate(req, res)) return;

  type RequestBody = {
    content: string;
    comment_idx: number;
  };

  const data: RequestBody = req.body;
  const user: User = req.user;

  try {
    const commentRepo = getRepository(Comment);
    const comment: Comment = await commentRepo.findOne({
      where: {
        idx: data.comment_idx,
      },
    });

    if (!comment) {
      logger.yellow("[POST] 댓글 없음.");
      res.status(404).json({
        status: 404,
        message: "댓글 없음.",
      });
      return;
    }

    const replyRepo = getRepository(Reply);
    const reply = new Reply();

    reply.content = data.content;
    reply.comment = comment;
    reply.user = user;

    await replyRepo.save(reply);

    logger.green("[POST] 답글 작성 성공.");
    res.status(200).json({
      status: 200,
      message: "답글 작성 성공.",
    });
  } catch (error) {
    logger.red("[POST] 답글 작성 서버 오류.");
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
