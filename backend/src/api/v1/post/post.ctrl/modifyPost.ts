import { Response } from "express";
import { getRepository } from "typeorm";
import Category from "../../../../entity/Category";
import Post from "../../../../entity/Post";
import User from "../../../../entity/User";
import logger from "../../../../lib/logger";
import { validateModify } from "../../../../lib/validation/post";
import AuthRequest from "../../../../type/AuthRequest";

export default async (req: AuthRequest, res: Response) => {
  if (!validateModify(req, res)) return;

  const idx: number = Number(req.params.idx);

  if (isNaN(idx)) {
    logger.yellow("[PUT] 검증 오류. idx is NaN");
    res.status(400).json({
      status: 400,
      message: "검증 오류.",
    });
    return;
  }

  type RequestBody = {
    title: string;
    description: string;
    content: string;
    thumbnail: string;
    is_temp?: boolean;
    category_idx: number;
  };

  const data: RequestBody = req.body;
  const user: User = req.user;

  try {
    const postRepo = getRepository(Post);
    const post: Post = await postRepo.findOne({
      where: {
        idx,
        is_deleted: false,
      },
    });

    if (!post) {
      logger.yellow("[PUT] 글 없음.");
      res.status(404).json({
        status: 404,
        message: "글 없음.",
      });
      return;
    }

    if (post.fk_user_idx !== user.idx) {
      logger.yellow("[PUT] 권한 없음.");
      res.status(403).json({
        status: 403,
        message: "권한 없음.",
      });
      return;
    }

    if (data.category_idx) {
      const categoryRepo = getRepository(Category);
      const category = await categoryRepo.findOne({
        where: { idx: data.category_idx },
      });

      if (!category) {
        logger.yellow("[PUT] 카테고리 없음.");
        res.status(404).json({
          status: 404,
          message: "카테고리 없음",
        });
        return;
      }

      post.category = category;
    } else {
      //category_idx가 없을 때
      //만약 temp가 아니라면......
      if (
        (data.is_temp !== null && data.is_temp === false) ||
        post.is_temp === false
      ) {
        logger.yellow("[PUT] 검증 오류. not temp but no category.");
        res.status(400).json({
          status: 400,
          message: "검증 오류.",
        });
        return;
      }
    }

    //data.is_temp가 false이고 post.is_temp가 true이면
    //새 글이 작성되므로 작성시간을 새로 할당해줘뇨~
    if (!data.is_temp && post.is_temp) {
      post.created_at = new Date();
    }

    post.updated_at = new Date();
    post.title = data.title || post.title;
    post.description = data.description || post.description;
    post.is_temp = data.is_temp === null ? post.is_temp : data.is_temp;
    post.content = data.content || post.content;
    post.thumbnail = data.thumbnail;

    await postRepo.save(post);

    logger.green("[PUT] 글 수정 성공.");
    res.status(200).json({
      status: 200,
      message: "글 수정 성공.",
    });
  } catch (error) {
    logger.red("[PUT] 글 수정 서버 오류.", error.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
