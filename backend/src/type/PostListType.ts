import Post from "../entity/Post";

export default interface PostListType extends Post {
  user_avatar?: string;
  user_name?: string;
  category_name?: string;
  comment_count?: number;
  like_count?: number;
}
