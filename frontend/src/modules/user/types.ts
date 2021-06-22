import { AxiosError } from "axios";
import { IResponse } from "types/response.type";
import IUser from "types/user.type";
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type UserAction = ActionType<typeof actions>;

export type UserState = {
  loading: boolean;
  error: AxiosError<IResponse> | null;
  data: {
    login: boolean;
    admin: boolean;
    userCount: number;
    profiles: IUser[];
    profile: IUser;
    adminProfile: IUser;
  };
};
