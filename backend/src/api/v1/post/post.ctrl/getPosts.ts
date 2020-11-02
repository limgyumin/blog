import { Request, Response } from "express";
import { FindManyOptions, getRepository } from "typeorm";
import Category from "../../../../entity/Category";
import Comment from "../../../../entity/Comment";
import Like from "../../../../entity/Like";
import Post from "../../../../entity/Post";
import Reply from "../../../../entity/Reply";
import logger from "../../../../lib/logger";
import generateURL from "../../../../lib/util/generateURL";
import PostListType from "../../../../type/PostListType";

export default async (req: Request, res: Response) => {
  const categoryIdx = req.query.category;

  const queryConditions: FindManyOptions = {
    select: ["idx", "title", "description", "thumbnail", "created_at"],
    where: {
      category: null,
      is_temp: false,
      is_deleted: false,
    },
    order: {
      created_at: "DESC",
    },
  };

  try {
    if (categoryIdx) {
      const categoryRepo = getRepository(Category);
      const category = await categoryRepo.findOne({
        where: {
          idx: categoryIdx,
        },
      });

      if (!category) {
        logger.yellow("[GET] 카테고리 없음.");
        res.status(404).json({
          status: 404,
          message: "카테고리 없음.",
        });
        return;
      }

      queryConditions.where["category"] = category;
    } else {
      delete queryConditions.where["category"];
    }

    const postRepo = getRepository(Post);
    const [posts, post_count]: [
      PostListType[],
      number
    ] = await postRepo.findAndCount(queryConditions);

    for (let i in posts) {
      let total_count = 0;

      if (posts[i].thumbnail) {
        posts[i].thumbnail = generateURL(req, posts[i].thumbnail);
      }

      const commentRepo = getRepository(Comment);
      const [comments, comment_count] = await commentRepo.findAndCount({
        where: {
          post: posts[i],
        },
      });

      const likeRepo = getRepository(Like);
      const like_count = await likeRepo.count({
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
      posts[i].like_count = like_count;
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
