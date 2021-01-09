import { Router } from "express";
import login from "./auth.ctrl/login";
import fcmToken from "./auth.ctrl/fcmToken";
import authMiddleWare from "../../../lib/middleware/auth";

const router = Router();

router.post("/login", login);
router.post("/fcm", authMiddleWare.user, fcmToken);

export default router;
