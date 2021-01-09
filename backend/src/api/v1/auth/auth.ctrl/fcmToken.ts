import { Response } from "express";
import { getRepository } from "typeorm";
import User from "../../../../entity/User";
import logger from "../../../../lib/logger";
import { validateFcm } from "../../../../lib/validation/auth";
import AuthRequest from "../../../../type/AuthRequest";

export default async (req: AuthRequest, res: Response) => {
  if (!validateFcm(req, res)) return;

  const user: User = req.user;

  type RequestBody = {
    token: string;
  };

  const data: RequestBody = req.body;

  try {
    const userRepo = getRepository(User);

    user.fcm = data.token;
    user.fcm_allow = true;

    await userRepo.save(user);

    logger.green("[POST] FCM 토큰 저장 성공.");
    res.status(200).json({
      status: 200,
      message: "FCM 토큰 저장 성공.",
    });
  } catch (error) {
    logger.red("[POST] FCM 토큰 저장 서버 오류.", error.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
