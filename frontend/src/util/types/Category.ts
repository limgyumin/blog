export interface CategoryType {
  idx: number;
  name: string;
  post_count: number;
}

export interface PostNameType {
  idx: number;
  title: string;
  created_at: Date;
}

export interface CategoryPostsType extends CategoryType {
  posts: PostNameType[];
}
