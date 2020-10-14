import { Router } from "express";
import createComment from "./comment.ctrl/createComment";
import getComments from "./comment.ctrl/getComments";
import modifyComment from "./comment.ctrl/modifyComment";
import deleteComment from "./comment.ctrl/deleteComment";

const router = Router();

router.post("/", createComment);
router.get("/", getComments);
router.put("/:idx", modifyComment);
router.delete("/:idx", deleteComment);

export default router;