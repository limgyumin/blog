import "dotenv/config";
import { Response } from "express";
import { getRepository } from "typeorm";
import User from "../../../../entity/User";
import logger from "../../../../lib/logger";
import AuthRequest from "../../../../type/AuthRequest";

export default async (req: AuthRequest, res: Response) => {
  const { id } = req.user;

  try {
    const userRepo = getRepository(User);
    const user = await userRepo.findOne({
      select: ["id", "name", "bio", "created_at"],
      where: { id },
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
