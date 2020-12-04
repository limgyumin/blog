import { Router } from "express";
import authMiddleWare from "../../../lib/middleware/auth";
import createComment from "./comment.ctrl/createComment";
import getComments from "./comment.ctrl/getComments";
import modifyComment from "./comment.ctrl/modifyComment";
import deleteComment from "./comment.ctrl/deleteComment";
import getCommentReplyCount from "./comment.ctrl/getCommentReplyCount";

const router = Router();

router.post("/", authMiddleWare.user, createComment);
router.get("/", authMiddleWare.guest, getComments);
router.get("/reply/:idx", authMiddleWare.guest, getCommentReplyCount);
router.put("/:idx", authMiddleWare.user, modifyComment);
router.delete("/:idx", authMiddleWare.user, deleteComment);

export default router;
