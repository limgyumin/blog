import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Reply from "../../../../entity/Reply";
import logger from "../../../../lib/logger";

export default async (req: Request, res: Response) => {
  const idx: number = Number(req.params.idx);

  if (isNaN(idx)) {
    logger.yellow("[GET] 검증 오류. idx is NaN");
    res.status(400).json({
      status: 400,
      message: "검증 오류.",
    });
    return;
  }

  try {
    const replyRepo = getRepository(Reply);
    const reply_count: number = await replyRepo.count({
      where: {
        fk_comment_idx: idx,
      },
    });

    logger.green("[GET] 답글 개수 조회 성공.");
    res.status(200).json({
      status: 200,
      message: "답글 개수 조회 성공.",
      data: {
        reply_count,
      },
    });
  } catch (error) {
    logger.red("[GET] 답글 개수 조회 서버 오류.");
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
