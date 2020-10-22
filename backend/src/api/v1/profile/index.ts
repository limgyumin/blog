import { Router } from "express";
import getProfile from "./profile.ctrl/getProfile";
import modifyProfile from "./profile.ctrl/modifyProfile";
import authMiddleWare from "../../../lib/middleware/auth";
import getProfiles from "./profile.ctrl/getProfiles";

const router = Router();

router.get("/all", getProfiles);
router.get("/", authMiddleWare.guest, getProfile);
router.put("/", authMiddleWare.guest, modifyProfile);

export default router;
