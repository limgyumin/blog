import { Request, Response } from "express";
import { getRepository } from "typeorm";
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
  try {
    const postRepo = getRepository(Post);
    const post: PostListType = await postRepo.findOne({
      select: [
        "idx",
        "title",
        "description",
        "thumbnail",
        "fk_category_idx",
        "fk_user_idx",
        "created_at",
        "is_fixed",
      ],
      where: {
        is_deleted: false,
        is_temp: false,
        is_fixed: true,
      },
    });

    if (post) {
      if (post.thumbnail) {
        post.thumbnail = generateURL(req, post.thumbnail);
      }

      const categoryRepo = getRepository(Category);
      const category: Category = await categoryRepo.findOne({
        where: {
          idx: post.fk_category_idx,
        },
      });

      const likeRepo = getRepository(Like);
      const like_count: number = await likeRepo.count({
        where: {
          post,
        },
      });

      const userRepo = getRepository(User);
      const user: User = await userRepo.findOne({
        idx: post.fk_user_idx,
      });

      const commentRepo = getRepository(Comment);
      const [comments, comment_count] = await commentRepo.findAndCount({
        where: {
          post,
        },
      });

      let total_count = 0;

      total_count += comment_count;

      for (let i in comments) {
        const replyRepo = getRepository(Reply);
        const reply_count: number = await replyRepo.count({
          where: {
            comment: comments[i],
          },
        });
        total_count += reply_count;
      }

      post.user = user;
      post.category_name = category.name;
      post.comment_count = total_count;
      post.like_count = like_count;
    }

    logger.green("[GET] 고정 글 조회 성공");
    res.status(200).json({
      status: 200,
      message: "고정 글 조회 성공.",
      data: {
        post,
      },
    });
  } catch (error) {
    logger.red("[GET] 고정 글 조회 서버 오류.");
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
