import ERequest from "enum/request.enum";
import { RootState } from "modules";
import { ThunkAction } from "redux-thunk";
import { requestApi } from "request/requestApi";
import { COMMENT } from "request/requestUrl";
import { ICommentCountResponse, ICommentsResponse } from "types/comment.type";
import {
  createCommentAsync,
  fetchCommentCountAsync,
  fetchCommentsAsync,
  updateCommentAsync,
} from "./actions";
import { CommentAction } from "./types";

export const fetchCommentCountThunk = (
  postIdx: number
): ThunkAction<void, RootState, void, CommentAction> => {
  return async (dispatch) => {
    const { request, success, failure } = fetchCommentCountAsync;
    dispatch(request());

    try {
      const { data }: ICommentCountResponse = await requestApi(
        COMMENT.GET.COUNT(postIdx),
        ERequest.GET
      );

      dispatch(success(data.total_count));
    } catch (err) {
      dispatch(failure(err));
    }
  };
};

export const fetchCommentsThunk = (
  postIdx: number,
  callback?: () => void
): ThunkAction<void, RootState, void, CommentAction> => {
  return async (dispatch) => {
    const { request, success, failure } = fetchCommentsAsync;
    dispatch(request());

    try {
      const { data }: ICommentsResponse = await requestApi(COMMENT.GET.ALL(postIdx), ERequest.GET);

      dispatch(success(data.comments));
      if (callback) callback();
    } catch (err) {
      dispatch(failure(err));
    }
  };
};

export const createCommentThunk = (
  postIdx: number,
  content: string,
  callback: () => void
): ThunkAction<void, RootState, void, CommentAction> => {
  return async (dispatch) => {
    const { request, success, failure } = createCommentAsync;
    dispatch(request());

    const body = {
      post_idx: postIdx,
      content,
    };

    try {
      await requestApi(COMMENT.CREATE, ERequest.POST, body);

      dispatch(success());
      callback();
    } catch (err) {
      dispatch(failure(err));
    }
  };
};

export const updateCommentThunk = (
  idx: number,
  content: string,
  callback: () => void
): ThunkAction<void, RootState, void, CommentAction> => {
  return async (dispatch) => {
    const { request, success, failure } = updateCommentAsync;
    dispatch(request());

    const body = {
      content,
    };

    try {
      await requestApi(COMMENT.UPDATE(idx), ERequest.PUT, body);

      dispatch(success());
      callback();
    } catch (err) {
      dispatch(failure(err));
    }
  };
};

export const deleteCommentThunk = (
  idx: number,
  callback: () => void
): ThunkAction<void, RootState, void, CommentAction> => {
  return async (dispatch) => {
    const { request, success, failure } = updateCommentAsync;
    dispatch(request());

    try {
      await requestApi(COMMENT.DELETE(idx), ERequest.DELETE);

      dispatch(success());
      callback();
    } catch (err) {
      dispatch(failure(err));
    }
  };
};
