import { Request, Response } from "express";
import { FindManyOptions, getRepository } from "typeorm";
import Category from "../../../../entity/Category";
import Comment from "../../../../entity/Comment";
import Like from "../../../../entity/Like";
import Post from "../../../../entity/Post";
import Reply from "../../../../entity/Reply";
import User from "../../../../entity/User";
import logger from "../../../../lib/logger";
import generateURL from "../../../../lib/util/generateURL";
import PostListType from "../../../../type/PostListType";

export default async (req: Request, res: Response) => {
  type RequestQuery = {
    category?: number;
    page?: number;
    limit?: number;
  };

  const query: RequestQuery = req.query;
  if (!query.page || !query.limit) {
    logger.yellow("[GET] 검증 오류. page or limit is null");
    res.status(400).json({
      status: 400,
      message: "검증 오류.",
    });
    return;
  }

  if (query.page < 1) {
    logger.yellow("[GET] 검증 오류. page is not valid");
    res.status(400).json({
      status: 400,
      message: "검증 오류.",
    });
    return;
  }

  const queryConditions: FindManyOptions = {
    select: [
      "idx",
      "title",
      "description",
      "thumbnail",
      "fk_category_idx",
      "fk_user_idx",
      "created_at",
    ],
    where: {
      category: null,
      is_temp: false,
      is_deleted: false,
    },
    order: {
      created_at: "DESC",
    },
    skip: (query.page - 1) * query.limit,
    take: query.limit,
  };

  try {
    if (query.category) {
      const categoryRepo = getRepository(Category);
      const category = await categoryRepo.findOne({
        where: {
          idx: query.category,
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
      if (posts[i].thumbnail) {
        posts[i].thumbnail = generateURL(req, posts[i].thumbnail);
      }

      const categoryRepo = getRepository(Category);
      const category: Category = await categoryRepo.findOne({
        where: {
          idx: posts[i].fk_category_idx,
        },
      });

      const likeRepo = getRepository(Like);
      const like_count = await likeRepo.count({
        where: {
          post: posts[i],
        },
      });

      const userRepo = getRepository(User);
      const user: User = await userRepo.findOne({
        where: {
          idx: posts[i].fk_user_idx,
        },
      });

      const commentRepo = getRepository(Comment);
      const [comments, comment_count] = await commentRepo.findAndCount({
        where: {
          post: posts[i],
        },
      });

      let total_count = 0;

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

      delete posts[i].fk_category_idx;
      delete posts[i].fk_user_idx;

      posts[i].user = user;
      posts[i].category_name = category.name;
      posts[i].like_count = like_count;
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
