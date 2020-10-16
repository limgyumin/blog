import { Request } from "express";
import User from "../entity/User";

export default interface AuthRequest extends Request {
  user: User;
}
