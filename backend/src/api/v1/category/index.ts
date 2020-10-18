import { Router } from "express";
import authMiddleWare from "../../../lib/middleware/auth";
import createCategory from "./category.ctrl/createCategory";
import getCategories from "./category.ctrl/getCategories";
import getCategory from "./category.ctrl/getCategory";
import modifyCategory from "./category.ctrl/modifyCategory";

const router = Router();

router.post("/", createCategory);
router.get("/:idx", getCategory);
router.get("/", getCategories);
router.put("/:idx", authMiddleWare.admin, modifyCategory);

export default router;
