import { IResponse } from "./response.type";

export default interface IUser {
  idx: number;
  avatar: string;
  id: string;
  name: string;
  bio: string;
  is_admin: boolean;
  created_at: Date;
}

export interface IAuthResponse extends IResponse {
  data: {
    access_token: string;
  };
}

export interface IProfileResponse extends IResponse {
  data: {
    user: IUser;
  };
}

export interface IProfilesResponse extends IResponse {
  data: {
    user_count: number;
    users: IUser[];
  };
}
