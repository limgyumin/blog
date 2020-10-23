import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Comment from "../../../../entity/Comment";
import Post from "../../../../entity/Post";
import Reply from "../../../../entity/Reply";
import logger from "../../../../lib/logger";
import PostCommentType from "../../../../type/PostCommentType";

export default async (req: Request, res: Response) => {
  try {
    const postRepo = getRepository(Post);
    const [posts, post_count]: [
      PostCommentType[],
      number
    ] = await postRepo.findAndCount({
      select: [
        "idx",
        "title",
        "description",
        "thumbnail",
        "fk_category_idx",
        "created_at",
      ],
      where: {
        is_temp: false,
      },
      order: {
        idx: "ASC",
      },
    });

    for (let i in posts) {
      let total_count = 0;
      const commentRepo = getRepository(Comment);
      const [comments, comment_count] = await commentRepo.findAndCount({
        where: {
          post: posts[i],
        },
      });

      total_count += comment_count;
      for (let j in comments) {
        const replyRepo = getRepository(Reply);
        const reply_count = await replyRepo.count({
          where: {
            comment: comments[j],
          },
        });
        total_count += reply_count;
      }
      posts[i].comment_count = total_count;
    }

    logger.green("[GET] 글 목록 조회 성공.");
    res.status(200).json({
      status: 200,
      message: "글 목록 조회 성공.",
      data: {
        post_count,
        posts,
      },
    });
  } catch (error) {
    logger.red("[GET] 글 목록 조회 서버 오류.", error.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
