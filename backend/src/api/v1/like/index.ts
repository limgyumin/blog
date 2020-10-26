import { Router } from "express";
import authMiddleWare from "../../../lib/middleware/auth";
import postLike from "./like.ctrl/postLike";
import getLikeCount from "./like.ctrl/getLikeCount";
import getLikeUsers from "./like.ctrl/getLikeUsers";
import getIsLiked from "./like.ctrl/getIsLiked";

const router = Router();

router.post("/", authMiddleWare.user, postLike);
router.get("/", authMiddleWare.guest, getLikeUsers);
router.get("/liked", authMiddleWare.user, getIsLiked);
router.get("/count", authMiddleWare.guest, getLikeCount);

export default router;
