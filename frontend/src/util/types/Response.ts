import { CategoryPostsType, CategoryType } from "./Category";
import CommentType from "./Comment";
import OtherPostsType from "./OtherPosts";
import PostType from "./Post";
import ReplyType from "./Reply";
import UserType from "./User";

export type Response = {
  status: number;
  message: string;
};

export interface LikeInfoResponse extends Response {
  data: {
    like_count: number;
    liked: boolean;
  };
}

export interface OtherPostsResponse extends Response {
  data: {
    other_posts: OtherPostsType;
  };
}

export interface PostResponse extends Response {
  data: {
    post: PostType;
  };
}

export interface PostsResponse extends Response {
  data: {
    post_count: number;
    posts: PostType[];
  };
}

export interface CategoriesResponse extends Response {
  data: {
    total: number;
    categories: CategoryType[];
  };
}

export interface CategoryPostsResponse extends Response {
  data: {
    categories: CategoryPostsType[];
  };
}

export interface ProfileResponse extends Response {
  data: {
    user: UserType;
  };
}

export interface AuthResponse extends Response {
  data: {
    access_token: string;
  };
}

export interface CommentsResponse extends Response {
  data: {
    comments: CommentType[];
  };
}

export interface CommentCountResponse extends Response {
  data: {
    total_count: number;
  };
}

export interface RepliesResponse extends Response {
  data: {
    replies: ReplyType[];
  };
}

export interface ReplyCountResponse extends Response {
  data: {
    reply_count: number;
  };
}

export interface UploadFileResponse extends Response {
  data: {
    files: string[];
  };
}
