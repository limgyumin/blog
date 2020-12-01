import { Router } from "express";
import authMiddleWare from "../../../lib/middleware/auth";
import postLike from "./like.ctrl/postLike";
import getLikeCount from "./like.ctrl/getLikeCount";
import getLikedUsers from "./like.ctrl/getLikedUsers";

const router = Router();

router.post("/", authMiddleWare.user, postLike);
router.get("/", authMiddleWare.guest, getLikeCount);
router.get("/users", authMiddleWare.guest, getLikedUsers);

export default router;
