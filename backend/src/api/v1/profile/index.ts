import { Router } from "express";
import getProfile from "./profile.ctrl/getProfile";
import modifyProfile from "./profile.ctrl/modifyProfile";

const router = Router();

router.get("/:idx", getProfile);
router.put("/:idx", modifyProfile);

export default router;
