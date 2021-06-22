import { AxiosError } from "axios";
import IPost, { IOtherPosts } from "types/post.type";
import { IResponse } from "types/response.type";
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type PostAction = ActionType<typeof actions>;

export type PostState = {
  loading: boolean;
  error: AxiosError<IResponse> | null;
  data: {
    notFound: boolean;
    post: IPost;
    otherPosts: IOtherPosts;
  };
};
