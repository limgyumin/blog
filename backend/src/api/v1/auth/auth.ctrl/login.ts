import "dotenv/config";
import { Request, Response } from "express";
import axios from "axios";
import logger from "../../../../lib/logger";
import findOrCreate from "../../../../lib/findOrCreate";
import User from "../../../../entity/User";
import { createToken } from "../../../../lib/token";
import UserDataType from "../../../../type/UserDataType";

export default async (req: Request, res: Response) => {
  type RequestBody = {
    code: string;
  };

  const { code }: RequestBody = req.body;

  try {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      },
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    console.log(response);

    const { access_token } = response.data;

    const githubAPI = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${access_token}`,
      },
    });

    const data: UserDataType = {
      avatar: githubAPI.data.avatar_url,
      id: githubAPI.data.login,
      name: githubAPI.data.name,
      bio: githubAPI.data.bio,
    };

    const isExist: User = await findOrCreate(data);

    if (!isExist) {
      logger.yellow("[POST] 로그인 인증 실패.");
      res.status(410).json({
        status: 410,
        message: "인증 실패",
      });
      return;
    }

    const token = await createToken(isExist.id);

    logger.green("[POST] 로그인 성공");
    res.status(200).json({
      status: 200,
      message: "로그인 성공.",
      access_token: token,
    });
  } catch (error) {
    logger.red("[POST] 로그인 서버 오류");
    res.status(500).json({
      status: 500,
      message: "서버 오류.",
    });
  }
};
