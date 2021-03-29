import { Response } from "express";
import { getRepository } from "typeorm";
import Comment from "../../../../entity/Comment";
import Post from "../../../../entity/Post";
import User from "../../../../entity/User";
import logger from "../../../../lib/logger";
import * as admin from "firebase-admin";
import { validateCreate } from "../../../../lib/validation/comment";
import AuthRequest from "../../../../type/AuthRequest";
import generateURL from "../../../../lib/util/generateURL";

export default async (req: AuthRequest, res: Response) => {
  if (!validateCreate(req, res)) return;

  type RequestBody = {
    content: string;
    post_idx: number;
  };

  const data: RequestBody = req.body;
  const user: User = req.user;

  try {
    const postRepo = getRepository(Post);
    const post = await postRepo.findOne({
      where: {
        idx: data.post_idx,
      },
    });

    if (!post) {
      logger.yellow("[POST] 글 없음.");
      res.status(404).json({
        status: 404,
        message: "글 없음.",
      });
      return;
    }

    const commentRepo = getRepository(Comment);
    const comment = new Comment();

    comment.content = data.content;
    comment.post = post;
    comment.user = user;

    await commentRepo.save(comment);

    const userRepo = getRepository(User);
    const adminUser = await userRepo.findOne({
      where: {
        is_admin: true,
      },
    });

    if (adminUser.fcm_allow && adminUser.fcm) {
      const postRepo = getRepository(Post);
      const post = await postRepo.findOne({
        idx: comment.fk_post_idx,
      });

      const message = {
        webpush: {
          notification: {
            icon: generateURL(req, "logo.png"),
            title: `${user.name}님이 댓글을 남겼습니당.`,
            body: `${comment.content}`,
            click_action: `https://nonamed.blog/post/${post.idx}`,
          },
        },
        data: {
          score: "850",
          time: "2:45",
        },
        token: adminUser.fcm,
      };

      admin
        .messaging()
        .send(message)
        .then((res: string) => {
          logger.green("[FCM] FCM 알림 전송 성공.");
        })
        .catch((err: Error) => {
          logger.red("[FCM] FCM 알림 전송 실패.", err.message);
        });
    }

    logger.green("[POST] 댓글 작성 성공.");
    res.status(200).json({
      status: 200,
      message: "댓글 작성 성공.",
    });
  } catch (error) {
    logger.red("[POST] 댓글 작성 서버 오류.", error.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
