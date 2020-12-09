import { Request, Response } from "express";
import { FindManyOptions, getRepository } from "typeorm";
import Post from "../../../../entity/Post";
import logger from "../../../../lib/logger";

export default async (req: Request, res: Response) => {
  const postIdx: number = Number(req.params.idx);

  if (isNaN(postIdx)) {
    logger.yellow("[GET] 검증 오류. idx is NaN");
    res.status(400).json({
      status: 400,
      message: "검증 오류.",
    });
    return;
  }

  try {
    const currentPost: Post = await getRepository(Post).findOne({
      where: {
        idx: postIdx,
        is_temp: false,
        is_deleted: false,
      },
    });

    if (!currentPost) {
      logger.yellow("[GET] 글 없음.");
      res.status(404).json({
        status: 404,
        message: "글 없음.",
      });
      return;
    }

    const { idx } = currentPost;

    const options: FindManyOptions = {
      select: ["idx", "title"],
      where: [
        { idx: idx - 1, is_deleted: false, is_temp: false },
        { idx: idx + 1, is_deleted: false, is_temp: false },
      ],
      order: { idx: "ASC" },
    };

    const otherPosts: Post[] = await getRepository(Post).find(options);

    const result: Record<"previous" | "next", Post | null> = {
      previous: null,
      next: null,
    };

    if (otherPosts.length === 1) {
      otherPosts[0].idx > idx
        ? (result.next = otherPosts[0])
        : (result.previous = otherPosts[0]);
    } else if (otherPosts.length === 2) {
      result.previous = otherPosts[0];
      result.next = otherPosts[1];
    }

    logger.green("[GET] 이전 및 다음 글 조회 성공.");
    res.status(200).json({
      status: 200,
      message: "이전 및 다음 글 조회 성공.",
      data: {
        other_posts: result,
      },
    });
  } catch (error) {
    logger.red("[GET] 이전 및 다음 글 조회 서버 오류.", error.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
