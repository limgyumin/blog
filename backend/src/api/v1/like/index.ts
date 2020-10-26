import { Router } from "express";
import authMiddleWare from "../../../lib/middleware/auth";
import createLike from "./like.ctrl/createLike";
import deleteLike from "./like.ctrl/deleteLike";
import getLikeCount from "./like.ctrl/getLikeCount";
import getLikeUsers from "./like.ctrl/getLikeUsers";

const router = Router();

router.post("/", authMiddleWare.user, createLike);
router.get("/", authMiddleWare.guest, getLikeUsers);
router.get("/count", authMiddleWare.guest, getLikeCount);
router.delete("/:idx", authMiddleWare.user, deleteLike);

export default router;
