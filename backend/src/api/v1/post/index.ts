import { Router } from "express";
import authMiddleWare from "../../../lib/middleware/auth";
import createPost from "./post.ctrl/createPost";
import getPost from "./post.ctrl/getPost";
import getPostCommentCount from "./post.ctrl/getPostCommentCount";
import getPosts from "./post.ctrl/getPosts";
import modifyPost from "./post.ctrl/modifyPost";
import deletePost from "./post.ctrl/deletePost";
import createTempPost from "./post.ctrl/createTempPost";

const router = Router();

router.post("/temp", authMiddleWare.guest, createTempPost);

router.post("/", authMiddleWare.guest, createPost);
router.get("/", getPosts);
router.get("/:idx", getPost);
router.get("/comment/:idx", getPostCommentCount);

router.put("/:idx", authMiddleWare.guest, modifyPost);

router.delete("/:idx", authMiddleWare.guest, deletePost);

export default router;
