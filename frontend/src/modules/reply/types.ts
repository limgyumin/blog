import { AxiosError } from "axios";
import { IResponse } from "types/response.type";
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type ReplyAction = ActionType<typeof actions>;

export type ReplyState = {
  loading: boolean;
  error: AxiosError<IResponse> | null;
};
