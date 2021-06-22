import { AxiosError } from "axios";
import IComment from "types/comment.type";
import { IResponse } from "types/response.type";
import { createAction, createAsyncAction } from "typesafe-actions";

export const FETCH_COMMENT_COUNT = "comment/FETCH_COMMENT_COUNT";
export const FETCH_COMMENT_COUNT_SUCCESS = "comment/FETCH_COMMENT_COUNT_SUCCESS";
export const FETCH_COMMENT_COUNT_FAILURE = "comment/FETCH_COMMENT_COUNT_FAILURE";

export const FETCH_COMMENTS = "comment/FETCH_COMMENTS";
export const FETCH_COMMENTS_SUCCESS = "comment/FETCH_COMMENTS_SUCCESS";
export const FETCH_COMMENTS_FAILURE = "comment/FETCH_COMMENTS_FAILURE";

export const CREATE_COMMENT = "comment/CREATE_COMMENT";
export const CREATE_COMMENT_SUCCESS = "comment/CREATE_COMMENT_SUCCESS";
export const CREATE_COMMENT_FAILURE = "comment/CREATE_COMMENT_FAILURE";

export const UPDATE_COMMENT = "comment/UPDATE_COMMENT";
export const UPDATE_COMMENT_SUCCESS = "comment/UPDATE_COMMENT_SUCCESS";
export const UPDATE_COMMENT_FAILURE = "comment/UPDATE_COMMENT_FAILURE";

export const DELETE_COMMENT = "comment/DELETE_COMMENT";
export const DELETE_COMMENT_SUCCESS = "comment/DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_FAILURE = "comment/DELETE_COMMENT_FAILURE";

export const INIT_COMMENT_ERROR = "comment/INIT_COMMENT_ERROR";

export const fetchCommentCountAsync = createAsyncAction(
  FETCH_COMMENT_COUNT,
  FETCH_COMMENT_COUNT_SUCCESS,
  FETCH_COMMENT_COUNT_FAILURE
)<void, number, AxiosError<IResponse>>();

export const fetchCommentsAsync = createAsyncAction(
  FETCH_COMMENTS,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE
)<void, IComment[], AxiosError<IResponse>>();

export const createCommentAsync = createAsyncAction(
  CREATE_COMMENT,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE
)<void, void, AxiosError<IResponse>>();

export const updateCommentAsync = createAsyncAction(
  UPDATE_COMMENT,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAILURE
)<void, void, AxiosError<IResponse>>();

export const deleteCommentAsync = createAsyncAction(
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE
)<void, void, AxiosError<IResponse>>();

export const initCommentError = createAction(INIT_COMMENT_ERROR)();
