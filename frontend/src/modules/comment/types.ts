import * as actions from "./actions";
import { ActionType } from "typesafe-actions";
import { AxiosError } from "axios";
import { IResponse } from "types/response.type";
import IComment from "types/comment.type";

export type CommentAction = ActionType<typeof actions>;

export type CommentState = {
  loading: boolean;
  error: AxiosError<IResponse> | null;
  data: {
    commentCount: number;
    comments: IComment[];
  };
};
