import "dotenv/config";
import { Response } from "express";
import logger from "../../../../lib/logger";
import AuthRequest from "../../../../type/AuthRequest";

export default async (req: AuthRequest, res: Response) => {
  const user = req.user;

  try {
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
