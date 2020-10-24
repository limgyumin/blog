import Comment from "../entity/Comment";

export default interface CommentListType extends Comment {
  user_name?: string;
  reply_count?: number;
}
