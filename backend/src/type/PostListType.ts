import Post from "../entity/Post";

export default interface PostListType extends Post {
  comment_count?: number;
  like_count?: number;
}
