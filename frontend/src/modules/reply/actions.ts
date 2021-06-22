import { AxiosError } from "axios";
import { IResponse } from "types/response.type";
import { createAction, createAsyncAction } from "typesafe-actions";

export const CREATE_REPLY = "reply/CREATE_REPLY";
export const CREATE_REPLY_SUCCESS = "reply/CREATE_REPLY_SUCCESS";
export const CREATE_REPLY_FAILURE = "reply/CREATE_REPLY_FAILURE";

export const UPDATE_REPLY = "reply/UPDATE_REPLY";
export const UPDATE_REPLY_SUCCESS = "reply/UPDATE_REPLY_SUCCESS";
export const UPDATE_REPLY_FAILURE = "reply/UPDATE_REPLY_FAILURE";

export const DELETE_REPLY = "reply/DELETE_REPLY";
export const DELETE_REPLY_SUCCESS = "reply/DELETE_REPLY_SUCCESS";
export const DELETE_REPLY_FAILURE = "reply/DELETE_REPLY_FAILURE";

export const INIT_REPLY_ERROR = "reply/INIT_REPLY_ERROR";

export const createReplyAsync = createAsyncAction(
  CREATE_REPLY,
  CREATE_REPLY_SUCCESS,
  CREATE_REPLY_FAILURE
)<void, void, AxiosError<IResponse>>();

export const updateReplyAsync = createAsyncAction(
  UPDATE_REPLY,
  UPDATE_REPLY_SUCCESS,
  UPDATE_REPLY_FAILURE
)<void, void, AxiosError<IResponse>>();

export const deleteReplyAsync = createAsyncAction(
  DELETE_REPLY,
  DELETE_REPLY_SUCCESS,
  DELETE_REPLY_FAILURE
)<void, void, AxiosError<IResponse>>();

export const initReplyError = createAction(INIT_REPLY_ERROR)();
