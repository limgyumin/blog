import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Post from "../../../../entity/Post";
import logger from "../../../../lib/logger";

export default async (req: Request, res: Response) => {
  try {
    const postRepo = getRepository(Post);
    const posts: Post[] = await postRepo.find({
      select: ["idx", "title", "content", "created_at"],
      where: {
        is_temp: true,
        is_deleted: false,
      },
      order: {
        created_at: "DESC",
      },
    });

    logger.green("[GET] 임시 글 조회 성공.");
    res.status(200).json({
      status: 200,
      message: "임시 글 조회 성공.",
      data: {
        posts,
      },
    });
  } catch (error) {
    logger.red("[GET] 임시 글 조회 서버 오류.", error.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
