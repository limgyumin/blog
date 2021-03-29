import { createConnection } from "typeorm";
import "dotenv/config";
import * as http from "http";
import app from "./app";

import logger from "./lib/logger";

const { PORT } = process.env;

createConnection()
  .then((connection) => {
    logger.gray("DB 연결됨.");
  })
  .catch((err) => {
    logger.red("에러 발생.", err);
  });

require("greenlock-express")
  .init({
    packageRoot: "/root/blog-server-vm",
    configDor: "./greenlock.d",
    cluster: false,
    maintainerEmail: "rbals4348@naver.com",
  })
  .serve(app);

// http.createServer(app).listen(PORT || 8080, () => {
//     logger.gray(`서버가 ${PORT}에서 실행중입니다.`);
// })
