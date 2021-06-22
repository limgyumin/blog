import { AxiosError } from "axios";
import IPost from "types/post.type";
import { IResponse } from "types/response.type";
import { createAction, createAsyncAction } from "typesafe-actions";

export const FETCH_SEARCHED_POSTS = "search/FETCH_SEARCHED_POSTS";
export const FETCH_SEARCHED_POSTS_SUCCESS = "search/FETCH_SEARCHED_POSTS_SUCCESS";
export const FETCH_SEARCHED_POSTS_FAILURE = "search/FETCH_SEARCHED_POSTS_FAILURE";

export const INIT_SEARCH_ERROR = "search/INIT_SEARCH_ERROR";

export const fetchSearchedPostsAsync = createAsyncAction(
  FETCH_SEARCHED_POSTS,
  FETCH_SEARCHED_POSTS_SUCCESS,
  FETCH_SEARCHED_POSTS_FAILURE
)<void, { total: number; notFound: boolean; posts: IPost[] }, AxiosError<IResponse>>();

export const initSearchError = createAction(INIT_SEARCH_ERROR)();
