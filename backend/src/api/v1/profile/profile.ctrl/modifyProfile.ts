import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../../../../entity/User";
import logger from "../../../../lib/logger";
import { validateProfile } from "../../../../lib/validation/profile";

export default async (req: Request, res: Response) => {
  if (!validateProfile(req, res)) return;

  const idx: number = Number(req.params.idx);

  if (isNaN(idx)) {
    logger.yellow("[PUT] 검증 오류.", "idx is NaN");
    res.status(400).json({
      status: 400,
      message: "검증 오류.",
    });
    return;
  }

  type RequestBody = {
    name: string;
    bio: string;
  };

  const data: RequestBody = req.body;

  try {
    const userRepo = getRepository(User);
    const user: User = await userRepo.findOne({ where: { idx } });

    user.name = data.name;
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
