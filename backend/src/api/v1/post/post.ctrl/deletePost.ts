import { Response } from "express";
import { getRepository } from "typeorm";
import Post from "../../../../entity/Post";
import User from "../../../../entity/User";
import logger from "../../../../lib/logger";
import AuthRequest from "../../../../type/AuthRequest";

export default async (req: AuthRequest, res: Response) => {
  const user: User = req.user;
  const idx: number = Number(req.params.idx);

  if (isNaN(idx)) {
    logger.yellow("[DELETE] 검증 오류. idx is NaN");
    res.status(401).json({
      status: 401,
      message: "검증 오류.",
    });
    return;
  }

  try {
    const postRepo = getRepository(Post);
    const post = await postRepo.findOne({
      where: { idx },
    });

    if (!post) {
      logger.yellow("[DELETE] 글 없음.");
      res.status(404).json({
        status: 404,
        message: "글 없음.",
      });
      return;
    }

    if (post.fk_user_idx !== user.idx) {
      logger.yellow("[DELETE] 권한 없음.");
      res.status(403).json({
        status: 403,
        message: "권한 없음.",
      });
      return;
    }

    post.is_deleted = true;
    await postRepo.save(post);

    logger.green("[DELETE] 글 삭제 성공.");
    res.status(200).json({
      status: 200,
      message: "글 삭제 성공.",
    });
  } catch (error) {
    logger.red("[DELETE] 글 삭제 서버 오류.");
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
