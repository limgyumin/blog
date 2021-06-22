import { AxiosError } from "axios";
import IPost from "types/post.type";
import { IResponse } from "types/response.type";
import { createAction, createAsyncAction } from "typesafe-actions";

export const FETCH_POSTS = "common/FETCH_POSTS";
export const FETCH_POSTS_SUCCESS = "common/FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_FAILURE = "common/FETCH_POSTS_FAILURE";

export const INCREASE_PAGE = "common/INCREASE_PAGE";
export const RESET_PAGE = "common/RESET_PAGE";
export const INIT_COMMON_ERROR = "common/INIT_COMMON_ERROR";

export const fetchPostsAsync = createAsyncAction(
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE
)<number, { total: number; notFound: boolean; posts: IPost[] }, AxiosError<IResponse>>();

export const increasePage = createAction(INCREASE_PAGE)();
export const resetPage = createAction(RESET_PAGE)();
export const initCommonError = createAction(INIT_COMMON_ERROR)();
