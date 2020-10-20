import AuthRequest from "../../../../type/AuthRequest";
import { Response } from "express";
import { getRepository } from "typeorm";
import User from "../../../../entity/User";
import logger from "../../../../lib/logger";
import { validateModify } from "../../../../lib/validation/profile";

export default async (req: AuthRequest, res: Response) => {
  if (!validateModify(req, res)) return;

  type RequestBody = {
    name: string;
    bio: string;
  };

  const data: RequestBody = req.body;
  const { id } = req.user;

  try {
    const userRepo = getRepository(User);
    const user: User = await userRepo.findOne({ where: { id } });

    if (!user) {
      logger.yellow("[PUT] 유저 없음.");
      res.status(404).json({
        status: 404,
        message: "유저 없음.",
      });
      return;
    }

    user.name = data.name.length ? user.id : data.name;
    user.bio = data.bio;

    await userRepo.save(user);

    logger.green("[PUT] 프로필 수정 성공.");
    res.status(200).json({
      status: 200,
      message: "프로필 수정 성공.",
    });
  } catch (error) {
    logger.red("[PUT] 프로필 수정 서버 오류.");
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
