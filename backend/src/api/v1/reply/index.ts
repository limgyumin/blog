import { Router } from "express";
import authMiddleWare from "../../../lib/middleware/auth";
import createReply from "./reply.ctrl/createReply";
import deleteReply from "./reply.ctrl/deleteReply";
import getReplies from "./reply.ctrl/getReplies";
import modifyReply from "./reply.ctrl/modifyReply";

const router = Router();

router.post("/", authMiddleWare.user, createReply);
router.get("/", authMiddleWare.guest, getReplies);
router.put("/:idx", authMiddleWare.user, modifyReply);
router.delete("/:idx", authMiddleWare.user, deleteReply);

export default router;
