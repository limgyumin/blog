import "dotenv/config";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as admin from "firebase-admin";
import api from "./api";
const serviceAccount = require("./config/firebase.json");

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", api);
app.use("/public", express.static(path.join(__dirname, "../public")));

export default app;
