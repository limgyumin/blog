import { IResponse } from "./response.type";

export interface IUploadFileResponse extends IResponse {
  data: {
    files: string[];
  };
}
