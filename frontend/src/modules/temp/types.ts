import { AxiosError } from "axios";
import IPost from "types/post.type";
import { IResponse } from "types/response.type";
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type TempAction = ActionType<typeof actions>;

export type TempState = {
  loading: boolean;
  error: AxiosError<IResponse> | null;
  data: {
    posts: IPost[];
  };
};
