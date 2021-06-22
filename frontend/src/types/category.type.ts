import { IResponse } from "./response.type";

export interface ICategory {
  idx: number;
  name: string;
  post_count: number;
}

export interface IPostShortInfo {
  idx: number;
  title: string;
  created_at: Date;
}

export interface ICategoryPosts extends ICategory {
  posts: IPostShortInfo[];
}

export interface ICategoriesResponse extends IResponse {
  data: {
    total: number;
    categories: ICategory[];
  };
}

export interface ICategoryPostsResponse extends IResponse {
  data: {
    categories: ICategoryPosts[];
  };
}
