import { AxiosError } from "axios";
import { IResponse } from "types/response.type";
import IUser from "types/user.type";
import { createAction, createAsyncAction } from "typesafe-actions";

export const GITHUB_AUTH = "user/GITHUB_AUTH";
export const GITHUB_AUTH_SUCCESS = "user/GITHUB_AUTH_SUCCESS";
export const GITHUB_AUTH_FAILURE = "user/GITHUB_AUTH_FAILURE";

export const CREATE_FCM_TOKEN = "user/CREATE_FCM_TOKEN";
export const CREATE_FCM_TOKEN_SUCCESS = "user/CREATE_FCM_TOKEN_SUCCESS";
export const CREATE_FCM_TOKEN_FAILURE = "user/CREATE_FCM_TOKEN_FAILURE";

export const FETCH_MY_PROFILE = "user/FETCH_MY_PROFILE";
export const FETCH_MY_PROFILE_SUCCESS = "user/FETCH_MY_PROFILE_SUCCESS";
export const FETCH_MY_PROFILE_FAILURE = "user/FETCH_MY_PROFILE_FAILURE";

export const FETCH_ADMIN_PROFILE = "user/FETCH_ADMIN_PROFILE";
export const FETCH_ADMIN_PROFILE_SUCCESS = "user/FETCH_ADMIN_PROFILE_SUCCESS";
export const FETCH_ADMIN_PROFILE_FAILURE = "user/FETCH_ADMIN_PROFILE_FAILURE";

export const FETCH_PROFILES = "user/FETCH_PROFILES";
export const FETCH_PROFILES_SUCCESS = "user/FETCH_PROFILES_SUCCESS";
export const FETCH_PROFILES_FAILURE = "user/FETCH_PROFILES_FAILURE";

export const INIT_USER = "user/INIT_USER";
export const INIT_USER_ERROR = "user/INIT_USER_ERROR";

export const gitHubAuthAsync = createAsyncAction(
  GITHUB_AUTH,
  GITHUB_AUTH_SUCCESS,
  GITHUB_AUTH_FAILURE
)<void, void, AxiosError<IResponse>>();

export const createFcmTokenAsync = createAsyncAction(
  CREATE_FCM_TOKEN,
  CREATE_FCM_TOKEN_SUCCESS,
  CREATE_FCM_TOKEN_FAILURE
)<void, void, AxiosError<IResponse>>();

export const fetchProfilesAsync = createAsyncAction(
  FETCH_PROFILES,
  FETCH_PROFILES_SUCCESS,
  FETCH_PROFILES_FAILURE
)<void, { userCount: number; profiles: IUser[] }, AxiosError<IResponse>>();

export const fetchMyProfileAsync = createAsyncAction(
  FETCH_MY_PROFILE,
  FETCH_MY_PROFILE_SUCCESS,
  FETCH_MY_PROFILE_FAILURE
)<void, IUser, AxiosError<IResponse>>();

export const fetchAdminProfileAsync = createAsyncAction(
  FETCH_ADMIN_PROFILE,
  FETCH_ADMIN_PROFILE_SUCCESS,
  FETCH_ADMIN_PROFILE_FAILURE
)<void, IUser, AxiosError<IResponse>>();

export const initUser = createAction(INIT_USER)();
export const initUserError = createAction(INIT_USER_ERROR)();
