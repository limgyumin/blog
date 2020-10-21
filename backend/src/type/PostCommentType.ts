import Post from "../entity/Post";

export default interface PostCommentType extends Post {
  comment_count?: number;
}
