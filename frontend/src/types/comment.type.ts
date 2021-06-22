import { IResponse } from "./response.type";
import UserType from "./user.type";

export default interface IComment {
  idx: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  reply_count: number;
  user: UserType;
}

export interface ICommentsResponse extends IResponse {
  data: {
    comments: IComment[];
  };
}

export interface ICommentCountResponse extends IResponse {
  data: {
    total_count: number;
  };
}
