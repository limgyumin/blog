import { Request, Router } from "express";
import * as multer from "multer";
import { Options } from "multer";
import { v4 as uuidv4 } from "uuid";
import authMiddleWare from "../../../lib/middleware/auth";
import upload from "./upload.ctrl/upload";

const storage = multer.diskStorage({
  destination: (_req: Request, _file, cb: Function) => {
    cb(null, "./public/");
  },
  filename: (_req: Request, file, cb: Function) => {
    cb(null, `${file.fieldname}-${uuidv4()}-${file.originalname}`);
  },
});

const options: Options = {
  storage,
};

const uploadMid = multer(options) as any;

const router = Router();

router.post("/", authMiddleWare.admin, uploadMid.array("files"), upload);

export default router;
