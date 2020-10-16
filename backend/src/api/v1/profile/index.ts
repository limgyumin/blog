import { Router } from "express";
import getProfile from "./profile.ctrl/getProfile";

const router = Router();

router.get("/:idx", getProfile);

export default router;
