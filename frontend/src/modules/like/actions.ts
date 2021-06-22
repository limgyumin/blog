import { AxiosError } from "axios";
import { IResponse } from "types/response.type";
import IUser from "types/user.type";
import { createAction, createAsyncAction } from "typesafe-actions";

export const FETCH_LIKE_INFO = "like/FETCH_LIKE_INFO";
export const FETCH_LIKE_INFO_SUCCESS = "like/FETCH_LIKE_INFO_SUCCESS";
export const FETCH_LIKE_INFO_FAILURE = "like/FETCH_LIKE_INFO_FAILURE";

export const FETCH_LIKE_USERS = "like/FETCH_LIKE_USERS";
export const FETCH_LIKE_USERS_SUCCESS = "like/FETCH_LIKE_USERS_SUCCESS";
export const FETCH_LIKE_USERS_FAILURE = "like/FETCH_LIKE_USERS_FAILURE";

export const CREATE_LIKE = "like/CREATE_LIKE";
export const CREATE_LIKE_SUCCESS = "like/CREATE_LIKE_SUCCESS";
export const CREATE_LIKE_FAILURE = "like/CREATE_LIKE_FAILURE";

export const INIT_LIKE_ERROR = "like/INIT_LIKE_ERROR";

export const fetchLikeInfoAsync = createAsyncAction(
  FETCH_LIKE_INFO,
  FETCH_LIKE_INFO_SUCCESS,
  FETCH_LIKE_INFO_FAILURE
)<void, { liked: boolean; likeCount: number }, AxiosError<IResponse>>();

export const fetchLikeUsersAsync = createAsyncAction(
  FETCH_LIKE_USERS,
  FETCH_LIKE_USERS_SUCCESS,
  FETCH_LIKE_USERS_FAILURE
)<void, IUser[], AxiosError<IResponse>>();

export const createLikeAsync = createAsyncAction(
  CREATE_LIKE,
  CREATE_LIKE_SUCCESS,
  CREATE_LIKE_FAILURE
)<void, void, AxiosError<IResponse>>();

export const initLikeError = createAction(INIT_LIKE_ERROR)();
