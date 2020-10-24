import { Response } from "express";
import { getRepository } from "typeorm";
import Reply from "../../../../entity/Reply";
import User from "../../../../entity/User";
import logger from "../../../../lib/logger";
import AuthRequest from "../../../../type/AuthRequest";

export default async (req: AuthRequest, res: Response) => {
  const user: User = req.user;
  const idx: number = Number(req.params.idx);

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
    const replyRepo = getRepository(Reply);
    const reply = await replyRepo.findOne({
      where: {
        idx,
      },
    });

    if (!reply) {
      logger.yellow("[PUT] 답글 없음.");
      res.status(404).json({
        status: 404,
        message: "답글 없음.",
      });
      return;
    }

    reply.content = content;
    reply.updated_at = new Date();

    await replyRepo.save(reply);

    logger.green("[DELETE] 답글 수정 성공.");
    res.status(200).json({
      status: 200,
      message: "답글 수정 성공.",
    });
  } catch (error) {
    logger.red("[PUT] 답글 수정 서버 오류.", error.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
