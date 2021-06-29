import Comment from "../entity/Comment";
import Reply from "../entity/Reply";

export default interface CommentListType extends Comment {
  reply_count?: number;
  replies?: Reply[];
}
