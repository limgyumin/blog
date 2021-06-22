import { AxiosError } from "axios";
import IPost from "types/post.type";
import { IResponse } from "types/response.type";
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type SearchAction = ActionType<typeof actions>;

export type SearchState = {
  loading: boolean;
  error: AxiosError<IResponse> | null;
  data: {
    total: number;
    notFound: boolean;
    posts: IPost[];
  };
};
