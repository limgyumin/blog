import { Router } from "express";
import auth from "./auth";
import profile from "./profile";
import category from "./category";
import comment from "./comment";
import post from "./post";
import reply from "./reply";
import upload from "./upload";
import like from "./like";

const router = Router();

router.use("/auth", auth);
router.use("/profile", profile);
router.use("/category", category);
router.use("/upload", upload);
router.use("/post", post);
router.use("/comment", comment);
router.use("/reply", reply);
router.use("/like", like);

export default router;
