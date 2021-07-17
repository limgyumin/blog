import { IResponse } from "./response.type";
import UserType from "./user.type";

export default interface IPost {
  idx: number;
  title: string;
  description: string;
  thumbnail: string;
  content: string;
  created_at: Date;
  category_name: string;
  fk_category_idx: number;
  is_temp: boolean;
  user: UserType;
  comment_count: number;
  like_count: number;
}

export interface IOtherPosts {
  previous: {
    idx: number;
    title: string;
  };
  next: {
    idx: number;
    title: string;
  };
}

export interface IPostDTO {
  title: string;
  description?: string;
  content: string;
  category_idx?: number;
  thumbnail?: string;
}

export interface ILikeInfoResponse extends IResponse {
  data: {
    like_count: number;
    liked: boolean;
  };
}

export interface ILikedUsersResponse extends IResponse {
  data: {
    like_count: number;
    liked_users: UserType[];
  };
}

export interface IOtherPostsResponse extends IResponse {
  data: {
    other_posts: IOtherPosts;
  };
}

export interface IPostResponse extends IResponse {
  data: {
    post: IPost;
  };
}

export interface ICreateTempPostResponse extends IResponse {
  data: {
    idx: number;
  };
}

export interface IPostsResponse extends IResponse {
  data: {
    post_count: number;
    posts: IPost[];
  };
}

export type PostParamsType = {
  idx: string;
};

export type PostQueryType = {
  page: number;
  limit: number;
  category?: number;
};
