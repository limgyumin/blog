import { Router } from "express";
import authMiddleWare from "../../../lib/middleware/auth";
import createCategory from "./category.ctrl/createCategory";
import deleteCategory from "./category.ctrl/deleteCategory";
import getCategories from "./category.ctrl/getCategories";
import getCategory from "./category.ctrl/getCategory";
import modifyCategory from "./category.ctrl/modifyCategory";
import modifyOrderCategory from "./category.ctrl/modifyOrderCategory";

const router = Router();

router.post("/", createCategory);
router.get("/:idx", getCategory);
router.get("/", getCategories);
router.put("/:idx", authMiddleWare.admin, modifyCategory);
router.put("/", authMiddleWare.admin, modifyOrderCategory);
router.delete("/:idx", authMiddleWare.admin, deleteCategory);

export default router;
