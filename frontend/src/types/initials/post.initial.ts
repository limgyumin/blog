import IPost, { IPostDTO, IOtherPosts } from "types/post.type";
import { initialUserState } from "./user.initial";

export const initialPostState: IPost = {
  idx: 0,
  title: "",
  description: "",
  thumbnail: "",
  content: "",
  created_at: new Date(),
  category_name: "",
  fk_category_idx: 0,
  is_temp: false,
  user: initialUserState,
  comment_count: 0,
  like_count: 0,
};

export const initialOtherPostsState: IOtherPosts = {
  previous: {
    idx: 0,
    title: "",
  },
  next: {
    idx: 0,
    title: "",
  },
};

export const initialCreatePostState: IPostDTO = {
  title: "",
  description: "",
  content: "",
  category_idx: 0,
  thumbnail: null,
};
