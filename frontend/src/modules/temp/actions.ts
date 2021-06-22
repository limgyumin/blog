import { AxiosError } from "axios";
import IPost from "types/post.type";
import { IResponse } from "types/response.type";
import { createAction, createAsyncAction } from "typesafe-actions";

export const FETCH_TEMP_POSTS = "temp/FETCH_TEMP_POSTS";
export const FETCH_TEMP_POSTS_SUCCESS = "temp/FETCH_TEMP_POSTS_SUCCESS";
export const FETCH_TEMP_POSTS_FAILURE = "temp/FETCH_TEMP_POSTS_FAILURE";

export const INIT_TEMP_ERROR = "temp/INIT_TEMP_ERROR";

export const fetchTempPostsAsync = createAsyncAction(
  FETCH_TEMP_POSTS,
  FETCH_TEMP_POSTS_SUCCESS,
  FETCH_TEMP_POSTS_FAILURE
)<void, IPost[], AxiosError<IResponse>>();

export const initTempError = createAction(INIT_TEMP_ERROR)();
