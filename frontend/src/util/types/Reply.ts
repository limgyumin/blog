import UserType from "./User";

export default interface ReplyType {
  idx: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  user: UserType;
}
