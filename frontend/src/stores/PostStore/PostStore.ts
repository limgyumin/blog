import { action, observable } from "mobx";
import { autobind } from "core-decorators";
import Post from "../../assets/api/Post";

interface PostResponseType {
  status: number;
  message: string;
  data: {
    post_count: number;
    posts: PostType[];
  };
}

interface PostType {
  idx: number;
  title: string;
  description: string;
  thumbnail: string;
  fk_category_idx: number;
  created_at: Date;
  category_name: string;
  comment_count: number;
  like_count: number;
}

@autobind
class PostStore {
  @observable posts: PostType[] = [];

  @action
  handlePosts = async (categoryIdx?: number): Promise<PostResponseType> => {
    try {
      const response: PostResponseType = await Post.GetPosts(categoryIdx);
      this.posts = response.data["posts"];

      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(new Error(`${error}`));
      });
    }
  };
}

export default PostStore;
