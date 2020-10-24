import { Router } from "express";
import authMiddleWare from "../../../lib/middleware/auth";
import createReply from "./reply.ctrl/createReply";
import getReplies from "./reply.ctrl/getReplies";

const router = Router();

router.post("/", authMiddleWare.user, createReply);
router.get("/", authMiddleWare.guest, getReplies);

export default router;
