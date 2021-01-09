import { Response } from "express";
import { date } from "joi";
import { getRepository } from "typeorm";
import Comment from "../../../../entity/Comment";
import Post from "../../../../entity/Post";
import Reply from "../../../../entity/Reply";
import User from "../../../../entity/User";
import logger from "../../../../lib/logger";
import * as admin from "firebase-admin";
import { validateCreate } from "../../../../lib/validation/reply";
import AuthRequest from "../../../../type/AuthRequest";

export default async (req: AuthRequest, res: Response) => {
  if (!validateCreate(req, res)) return;

  type RequestBody = {
    comment_idx: number;
    content: string;
  };

  const data: RequestBody = req.body;
  const user: User = req.user;

  try {
    const commentRepo = getRepository(Comment);
    const comment: Comment = await commentRepo.findOne({
      where: {
        idx: data.comment_idx,
      },
    });

    if (!comment) {
      logger.yellow("[POST] 댓글 없음.");
      res.status(404).json({
        status: 404,
        message: "댓글 없음.",
      });
      return;
    }

    const replyRepo = getRepository(Reply);
    const reply = new Reply();

    reply.content = data.content;
    reply.comment = comment;
    reply.user = user;

    await replyRepo.save(reply);

    const userRepo = getRepository(User);
    const commentUser = await userRepo.findOne({
      where: {
        idx: comment.fk_user_idx,
      },
    });

    if (commentUser.fcm_allow && commentUser.fcm) {
      const postRepo = getRepository(Post);
      const post = await postRepo.findOne({
        where: {
          idx: comment.fk_post_idx,
        },
      });

      const message = {
        webpush: {
          notification: {
            icon: null,
            title: `${user.name}님께서 댓글을 남겼습니다.`,
            body: `${reply.content}`,
            click_action: `http://localhost:3000/post/${post.idx}`,
          },
        },
        data: {
          score: "850",
          time: "2:45",
        },
        token: commentUser.fcm,
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

    logger.green("[POST] 답글 작성 성공.");
    res.status(200).json({
      status: 200,
      message: "답글 작성 성공.",
    });
  } catch (error) {
    logger.red("[POST] 답글 작성 서버 오류.", error.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
