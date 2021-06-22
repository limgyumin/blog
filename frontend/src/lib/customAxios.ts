import axios, { AxiosError, AxiosRequestConfig } from "axios";
import token from "./token";
import { SERVER } from "config/config.json";

const addToken = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  const accessToken = token.get();

  if (accessToken) {
    config.headers["access_token"] = accessToken;
  }

  return config;
};

const addTokenErrorHandler = (err: AxiosError): void => {
  token.remove();
};

const baseURL = `${SERVER}/api/v1`;

const Api = axios.create({
  baseURL,
  params: {},
});

Api.defaults.headers = {
  "Cache-Control": "no-cache",
  Accept: "application/json",
  Pragma: "no-cache",
  Expires: "0",
};

Api.interceptors.request.use(addToken, addTokenErrorHandler);

export default Api;
