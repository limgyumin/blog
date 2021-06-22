import { AxiosError } from "axios";
import IPost, { IOtherPosts } from "types/post.type";
import { IResponse } from "types/response.type";
import { createAction, createAsyncAction } from "typesafe-actions";

export const FETCH_POST = "post/FETCH_POST";
export const FETCH_POST_SUCCESS = "post/FETCH_POST_SUCCESS";
export const FETCH_POST_FAILURE = "post/FETCH_POST_FAILURE";

export const FETCH_OTHER_POSTS = "post/FETCH_OTHER_POSTS";
export const FETCH_OTHER_POSTS_SUCCESS = "post/FETCH_OTHER_POSTS_SUCCESS";
export const FETCH_OTHER_POSTS_FAILURE = "post/FETCH_OTHER_POSTS_FAILURE";

export const CREATE_POST = "post/CREATE_POST";
export const CREATE_POST_SUCCESS = "post/CREATE_POST_SUCCESS";
export const CREATE_POST_FAILURE = "post/CREATE_POST_FAILURE";

export const CREATE_TEMP_POST = "post/CREATE_TEMP_POST";
export const CREATE_TEMP_POST_SUCCESS = "post/CREATE_TEMP_POST_SUCCESS";
export const CREATE_TEMP_POST_FAILURE = "post/CREATE_TEMP_POST_FAILURE";

export const UPDATE_POST = "post/UPDATE_POST";
export const UPDATE_POST_SUCCESS = "post/UPDATE_POST_SUCCESS";
export const UPDATE_POST_FAILURE = "post/UPDATE_POST_FAILURE";

export const DELETE_POST = "post/DELETE_POST";
export const DELETE_POST_SUCCESS = "post/DELETE_POST_SUCCESS";
export const DELETE_POST_FAILURE = "post/DELETE_POST_FAILURE";

export const INIT_POST_ERROR = "post/INIT_POST_ERROR";
export const INIT_POST = "post/INIT_POST";

export const fetchPostAsync = createAsyncAction(FETCH_POST, FETCH_POST_SUCCESS, FETCH_POST_FAILURE)<
  void,
  { notFound: boolean; post: IPost },
  AxiosError<IResponse>
>();

export const fetchOtherPostsAsync = createAsyncAction(
  FETCH_OTHER_POSTS,
  FETCH_OTHER_POSTS_SUCCESS,
  FETCH_OTHER_POSTS_FAILURE
)<void, IOtherPosts, AxiosError<IResponse>>();

export const createPostAsync = createAsyncAction(
  CREATE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE
)<void, void, AxiosError<IResponse>>();

export const createTempPostAsync = createAsyncAction(
  CREATE_TEMP_POST,
  CREATE_TEMP_POST_SUCCESS,
  CREATE_TEMP_POST_FAILURE
)<void, void, AxiosError<IResponse>>();

export const updatePostAsync = createAsyncAction(
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE
)<void, void, AxiosError<IResponse>>();

export const deletePostAsync = createAsyncAction(
  DELETE_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE
)<void, void, AxiosError<IResponse>>();

export const initPostError = createAction(INIT_POST_ERROR)();
export const initPost = createAction(INIT_POST)();
