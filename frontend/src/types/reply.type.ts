import { IResponse } from "./response.type";
import UserType from "./user.type";

export default interface IReply {
  idx: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  user: UserType;
}

export interface IRepliesResponse extends IResponse {
  data: {
    replies: IReply[];
  };
}

export interface IReplyCountResponse extends IResponse {
  data: {
    reply_count: number;
  };
}
