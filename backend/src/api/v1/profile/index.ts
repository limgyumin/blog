import { Router } from "express";
import getProfile from "./profile.ctrl/getProfile";
import modifyProfile from "./profile.ctrl/modifyProfile";
import authMiddleWare from "../../../lib/middleware/auth";

const router = Router();

router.get("/", authMiddleWare.guest, getProfile);
router.put("/", authMiddleWare.guest, modifyProfile);

export default router;
