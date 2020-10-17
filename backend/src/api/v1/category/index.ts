import { Router } from "express";
import createCategory from "./category.ctrl/createCategory";

const router = Router();

router.post("/", createCategory);

export default router;
