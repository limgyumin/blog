import { action, observable } from "mobx";
import { autobind } from "core-decorators";
import Post from "../../assets/api/Post";

interface PostParamsType {
  page: number;
  limit: number;
  category?: number;
}

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
  handlePosts = async (query: PostParamsType): Promise<PostResponseType> => {
    try {
      // 일단 response를 받고
      const response: PostResponseType = await Post.GetPosts(query);

      // page가 1을 초과하면 posts 배열에 response.data.posts를 추가해요.
      if (query.page > 1) {
        if (response.data && response.data.posts) {
          const addPostPromise: Promise<void>[] = [];
          response.data.posts.map((post: PostType, idx: number) => {
            addPostPromise.push(
              new Promise((resolve, reject) => {
                this.posts.push(post);
                resolve();
              })
            );
          });
          await Promise.all(addPostPromise);
        }
      } else {
        // 아니면 그냥 넣어주고.........
        this.posts = response.data.posts;
      }

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
