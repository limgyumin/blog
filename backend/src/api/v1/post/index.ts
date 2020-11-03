import { Router } from "express";
import authMiddleWare from "../../../lib/middleware/auth";
import createPost from "./post.ctrl/createPost";
import getPost from "./post.ctrl/getPost";
import getPostCommentCount from "./post.ctrl/getPostCommentCount";
import getPosts from "./post.ctrl/getPosts";
import modifyPost from "./post.ctrl/modifyPost";
import deletePost from "./post.ctrl/deletePost";
import createTempPost from "./post.ctrl/createTempPost";
import getTempPosts from "./post.ctrl/getTempPosts";
import searchPost from "./post.ctrl/searchPost";

const router = Router();

router.get("/temp", authMiddleWare.admin, getTempPosts);
router.get("/search", authMiddleWare.guest, searchPost);
router.put("/:idx", authMiddleWare.admin, modifyPost);

router.post("/temp", authMiddleWare.admin, createTempPost);
router.post("/", authMiddleWare.admin, createPost);

router.get("/", getPosts);
router.get("/:idx", authMiddleWare.guest, getPost);
router.get("/comment/:idx", getPostCommentCount);

router.delete("/:idx", authMiddleWare.admin, deletePost);

export default router;
