import { action, observable } from "mobx";
import { autobind } from "core-decorators";
import Post from "../../assets/api/Post";
import PostType from "../../util/types/PostType";

interface PostParamsType {
  page: number;
  limit: number;
  category?: number;
}

interface PostsResponseType {
  status: number;
  message: string;
  data: {
    post_count: number;
    posts: PostType[];
  };
}

interface PostFixedResponseType {
  status: number;
  message: string;
  data: {
    post: PostType;
  };
}

@autobind
class PostStore {
  @observable fixedPost: PostType = <PostType>{};
  @observable posts: PostType[] = [];

  @action
  handlePosts = async (query: PostParamsType): Promise<PostsResponseType> => {
    try {
      // 일단 response를 받고
      const response: PostsResponseType = await Post.GetPosts(query);

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

  @action
  handleFixedPost = async (): Promise<PostFixedResponseType> => {
    try {
      const response: PostFixedResponseType = await Post.GetFixedPost();

      if (response.data.post) {
        this.fixedPost = response.data.post;
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
