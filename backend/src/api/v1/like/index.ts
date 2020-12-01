import { Router } from "express";
import authMiddleWare from "../../../lib/middleware/auth";
import postLike from "./like.ctrl/postLike";
import getLikedUsers from "./like.ctrl/getLikedUsers";
import getLikeInfo from "./like.ctrl/getLikeInfo";

const router = Router();

router.post("/", authMiddleWare.user, postLike);
router.get("/:idx", authMiddleWare.guest, getLikeInfo);
router.get("/users", authMiddleWare.guest, getLikedUsers);

export default router;
