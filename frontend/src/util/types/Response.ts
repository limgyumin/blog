import { CategoryType } from "./Category";
import PostType from "./Post";

export type Response = {
  status: number;
  message: string;
};

export interface PostsResponse extends Response {
  data: {
    post_count: number;
    posts: PostType[];
  };
}

export interface PostFixedResponse extends Response {
  data: {
    post: PostType;
  };
}

export interface CategoryResponse extends Response {
  data: {
    total: number;
    categories: CategoryType[];
  };
}

export interface GetProfileResponse extends Response {
  data: {
    user: {
      avatar: string;
      id: string;
      name: string;
      bio: string;
      is_admin: boolean;
      created_at: Date;
    };
  };
}
