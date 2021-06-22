import { AxiosResponse } from "axios";
import Api from "lib/customAxios";

export const requestApi = async (
  url: string,
  method: string,
  body?: any,
  formData?: FormData
): Promise<any> => {
  const { data }: AxiosResponse = await Api[method](url, body, formData);

  return data;
};
