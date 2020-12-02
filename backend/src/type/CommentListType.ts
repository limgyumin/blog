import Comment from "../entity/Comment";

export default interface CommentListType extends Comment {
  reply_count?: number;
}
