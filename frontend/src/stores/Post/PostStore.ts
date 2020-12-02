import { action, observable } from "mobx";
import { autobind } from "core-decorators";
import Post from "../../assets/api/Post";
import PostType from "../../util/types/Post";
import {
  LikeInfoResponse,
  PostFixedResponse,
  PostResponse,
  PostsResponse,
} from "../../util/types/Response";

interface PostParamsType {
  page: number;
  limit: number;
  category?: number;
}

@autobind
class PostStore {
  @observable fixedPost: PostType = <PostType>{};
  @observable post: PostType = <PostType>{};
  @observable posts: PostType[] = [];

  @action
  initPost = () => {
    this.post = <PostType>{};
  };

  @action
  initPosts = () => {
    this.posts = [];
  };

  @action
  initFixedPost = () => {
    this.fixedPost = <PostType>{};
  };

  @action
  handleFixedPost = async (): Promise<PostFixedResponse> => {
    try {
      const response: PostFixedResponse = await Post.GetFixedPost();

      if (response.data.post) {
        this.fixedPost = response.data.post;
      }

      return new Promise(
        (resolve: (response: PostFixedResponse) => void, reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      return new Promise((resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action
  handlePosts = async (query: PostParamsType): Promise<PostsResponse> => {
    try {
      // 일단 response를 받고
      const response: PostsResponse = await Post.GetPosts(query);

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

      return new Promise(
        (resolve: (response: PostsResponse) => void, reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      return new Promise((resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action
  handlePost = async (idx: number): Promise<PostResponse> => {
    try {
      const response: PostResponse = await Post.GetPost(idx);
      this.post = response.data.post;

      return new Promise(
        (resolve: (response: PostResponse) => void, reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      return new Promise((resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action
  handlePostLike = async (post_idx: number): Promise<Response> => {
    try {
      const response: Response = await Post.PostLike(post_idx);

      return new Promise((resolve: (response: Response) => void, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action
  handleLikeInfo = async (idx: number): Promise<LikeInfoResponse> => {
    try {
      const response: LikeInfoResponse = await Post.GetLikeInfo(idx);

      return new Promise(
        (resolve: (response: LikeInfoResponse) => void, reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      return new Promise((resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };
}

export default PostStore;
