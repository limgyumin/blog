import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../../../../entity/User";
import logger from "../../../../lib/logger";

export default async (req: Request, res: Response) => {
  try {
    const userRepo = getRepository(User);
    const [users, user_count] = await userRepo.findAndCount({
      select: ["idx", "avatar", "id", "name", "bio", "created_at"],
      where: {
        is_admin: false,
      },
      order: {
        idx: "ASC",
      },
    });

    logger.green("[GET] 프로필 목록 조회 성공.");
    res.status(200).json({
      status: 200,
      message: "프로필 목록 조회 성공.",
      data: {
        user_count,
        users,
      },
    });
  } catch (error) {
    logger.red("[GET] 프로필 목록 조회 서버 오류.");
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
