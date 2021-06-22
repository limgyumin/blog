import { AxiosError } from "axios";
import IPost from "types/post.type";
import { IResponse } from "types/response.type";
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type CommonAction = ActionType<typeof actions>;

export type CommonState = {
  loading: boolean;
  error: AxiosError<IResponse> | null;
  data: {
    page: number;
    category: number;
    notFound: boolean;
    total: number;
    posts: IPost[];
  };
};
