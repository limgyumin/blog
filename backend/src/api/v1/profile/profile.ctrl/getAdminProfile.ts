import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../../../../entity/User";
import logger from "../../../../lib/logger";

export default async (req: Request, res: Response) => {
  try {
    const userRepo = getRepository(User);
    const user: User = await userRepo.findOne({
      where: {
        is_admin: true,
      },
    });

    logger.green("[GET] 관리자 프로필 조회 성공.");
    res.status(200).json({
      status: 200,
      message: "관리자 프로필 조회 성공.",
      data: {
        user,
      },
    });
  } catch (error) {
    logger.red("[GET] 관리자 프로필 조회 서버 오류.");
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
