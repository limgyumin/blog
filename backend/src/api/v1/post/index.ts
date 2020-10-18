import { Router } from "express";
import authMiddleWare from "../../../lib/middleware/auth";
import createPost from "./post.ctrl/createPost";
import getPost from "./post.ctrl/getPost";
import getPostCommentCount from "./post.ctrl/getPostCommentCount";
import getPosts from "./post.ctrl/getPosts";
import modifyPost from "./post.ctrl/modifyPost";
import deletePost from "./post.ctrl/deletePost";

const router = Router();

router.post("/", authMiddleWare.guest, createPost);

router.get("/", getPosts);
router.get("/:idx", getPost);
router.get("/comment/:idx", getPostCommentCount);

router.put("/", modifyPost);

router.delete("/:idx", deletePost);

export default router;
