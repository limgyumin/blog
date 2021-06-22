import ERequest from "enum/request.enum";
import { requestApi } from "request/requestApi";
import { FILE } from "request/requestUrl";
import { IUploadFileResponse } from "types/upload.type";

export const uploadImage = async (file: File): Promise<IUploadFileResponse> => {
  const formData: FormData = new FormData();
  formData.append("files", file);

  const res: IUploadFileResponse = await requestApi(FILE.UPLOAD, ERequest.POST, formData);

  return res;
};
