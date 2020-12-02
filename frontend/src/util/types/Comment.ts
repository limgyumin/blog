import UserType from "./User";

export default interface CommentType {
  idx: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  reply_count: number;
  user: UserType;
}
