import { Router } from "express";
import auth from "./auth";
import profile from "./profile";
import comment from "./comment";
import post from "./post";
import reply from "./reply";

const router = Router();

router.use("/auth", auth);
router.use("/profile", profile);
router.use("/commet", comment);
router.use("/post", post);
router.use("/reply", reply);

export default router;
