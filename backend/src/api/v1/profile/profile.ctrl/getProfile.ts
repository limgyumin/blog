import "dotenv/config";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../../../../entity/User";
import logger from "../../../../lib/logger";

export default async (req: Request, res: Response) => {
  const idx: number = Number(req.params.idx);

  if (isNaN(idx)) {
    logger.yellow("[GET] 검증 오류. idx is Not a Number");
    res.status(400).json({
      status: 400,
      message: "검증 오류",
    });
    return;
  }

  try {
    const userRepo = getRepository(User);
    const user = await userRepo.findOne({
      select: ["id", "name", "bio", "created_at"],
      where: { idx: idx },
    });

    if (!user) {
      logger.yellow("[GET] 유저 없음.");
      res.status(404).json({
        status: 404,
        message: "유저 없음",
      });
      return;
    }

    logger.green("[GET] 유저 프로필 조회 성공.");
    res.status(200).json({
      status: 200,
      message: "유저 프로필 조회 성공.",
      data: {
        user,
      },
    });
  } catch (error) {
    logger.red("[GET] 프로필 조회 서버 오류");
    res.status(500).json({
      status: 500,
      message: "서버 오류",
    });
  }
};
