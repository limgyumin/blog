import { Request, Response } from "express";
import { getRepository, Like } from "typeorm";
import Post from "../../../../entity/Post";
import logger from "../../../../lib/logger";
import generateURL from "../../../../lib/util/generateURL";

export default async (req: Request, res: Response) => {
  const { query } = req.query;

  try {
    const postRepo = getRepository(Post);
    const [posts, post_count] = await postRepo.findAndCount({
      where: {
        is_deleted: false,
        is_temp: false,
        title: Like(`%${query}%`),
      },
      order: {
        created_at: "DESC",
      },
    });

    posts.forEach((post: Post) => {
      if (!post.thumbnail) return;
      post.thumbnail = generateURL(req, post.thumbnail);
    });

    logger.green("[GET] 글 검색 성공.");
    res.status(200).json({
      status: 200,
      message: "글 검색 성공.",
      data: {
        post_count,
        posts,
      },
    });
  } catch (error) {
    logger.red("[GET] 글 검색 서버 오류.", error.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
