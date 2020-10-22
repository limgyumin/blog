import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Comment from "../../../../entity/Comment";
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
    const commentRepo = getRepository(Comment);
    const [comments, comment_count] = await commentRepo.findAndCount({
      where: {
        fk_post_idx: idx,
      },
    });

    let total_count: number = 0;

    total_count += comment_count;
    for (let i in comments) {
      const replyRepo = getRepository(Reply);
      const reply_count = await replyRepo.count({
        where: {
          comment: comments[i],
        },
      });
      total_count += reply_count;
    }

    logger.green("[GET] 댓글 개수 조회 성공.");
    res.status(200).json({
      status: 200,
      message: "댓글 개수 조회 성공.",
      data: {
        total_count,
      },
    });
  } catch (error) {
    logger.red("[GET] 댓글 개수 조회 서버 오류.");
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
