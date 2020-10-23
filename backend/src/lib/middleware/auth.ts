import { Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { isArray } from "util";
import User from "../../entity/User";
import AuthRequest from "../../type/AuthRequest";
import logger from "../logger";
import { verifyToken } from "../token";

const validateAuth = async (req: any) => {
  const reqToken: string | string[] = req.headers["access_token"];
  if (isArray(reqToken)) {
    throw new Error("TOKEN_IS_ARRAY");
  }

  const token = reqToken;
  try {
    const decodedToken = await verifyToken(token);

    const userRepo = getRepository(User);
    const user = await userRepo.findOne({
      where: {
        id: decodedToken.id,
      },
    });

    if (!user) {
      throw new Error("NO_USER");
    }

    return user;
  } catch (error) {
    switch (error.message) {
      case "jwt must be provided":
        throw new Error("NO_TOKEN");
      case "jwt malformed":
      case "invalid token":
      case "invalid signature":
        throw new Error("INVALID_TOKEN");
      case "jwt expired":
        throw new Error("EXPIRED_TOKEN");
      default:
        throw error;
    }
  }
};

const admin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user: User = await validateAuth(req);

    if (!user.is_admin) {
      return res.status(403).json({
        status: 403,
        message: "권한 없음.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    switch (error.message) {
      case "TOKEN_IS_ARRAY":
      case "NO_TOKEN":
      case "INVALID_TOKEN":
      case "NO_USER":
        res.status(401).json({
          status: 401,
          message: "인증 되지 않음",
        });
        return;
      case "EXPIRED_TOKEN":
        res.status(410).json({
          status: 410,
          message: "토큰 만료",
        });
        return;
      default:
        logger.red("토큰 검증 서버 오류.", error.message);
        res.status(500).json({
          status: 500,
          message: "서버 오류.",
        });
    }
  }
};

const user = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user: User = await validateAuth(req);
    req.user = user;

    next();
  } catch (error) {
    switch (error.message) {
      case "TOKEN_IS_ARRAY":
      case "NO_TOKEN":
      case "INVALID_TOKEN":
      case "NO_USER":
        res.status(401).json({
          status: 401,
          message: "인증 되지 않음.",
        });
        return;
      case "EXPIRED_TOKEN":
        res.status(410).json({
          status: 410,
          message: "토큰 만료",
        });
        return;
      default:
        logger.red("토큰 검증 서버 오류.", error.message);
        res.status(500).json({
          status: 500,
          message: "서버 오류.",
        });
    }
  }
};

const guest = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user: User = await validateAuth(req);
    req.user = user;
    next();
  } catch (err) {
    switch (err.message) {
      case "TOKEN_IS_ARRAY":
      case "NO_TOKEN":
      case "INVALID_TOKEN":
      case "NO_USER":
      case "EXPIRED_TOKEN":
        return next();
      default:
        logger.red("토큰 검증 서버 오류.", err.message);
        res.status(500).json({
          status: 500,
          message: "서버 오류.",
        });
    }
  }
};

export default {
  admin,
  guest,
  user,
};
