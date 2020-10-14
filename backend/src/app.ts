import "dotenv/config";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import api from "./api";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", api);

export default app;