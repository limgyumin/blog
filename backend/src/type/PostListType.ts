import Post from "../entity/Post";

export default interface PostListType extends Post {
  category_name?: string;
  comment_count?: number;
  like_count?: number;
}
