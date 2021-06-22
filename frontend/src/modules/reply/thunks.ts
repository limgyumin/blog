import { ThunkAction } from "redux-thunk";
import { RootState } from "modules";
import { ReplyAction } from "./types";
import { createReplyAsync, deleteReplyAsync, updateReplyAsync } from "./actions";
import { REPLY } from "request/requestUrl";
import ERequest from "enum/request.enum";
import { requestApi } from "request/requestApi";

export const createReplyThunk = (
  commentIdx: number,
  content: string,
  callback: () => void
): ThunkAction<void, RootState, void, ReplyAction> => {
  return async (dispatch) => {
    const { request, success, failure } = createReplyAsync;
    dispatch(request());

    const body = {
      comment_idx: commentIdx,
      content,
    };

    try {
      await requestApi(REPLY.CREATE, ERequest.POST, body);

      dispatch(success());
      callback();
    } catch (err) {
      dispatch(failure(err));
    }
  };
};

export const updateReplyThunk = (
  idx: number,
  content: string,
  callback: () => void
): ThunkAction<void, RootState, void, ReplyAction> => {
  return async (dispatch) => {
    const { request, success, failure } = updateReplyAsync;
    dispatch(request());

    const body = {
      content,
    };

    try {
      await requestApi(REPLY.UPDATE(idx), ERequest.PUT, body);

      dispatch(success());
      callback();
    } catch (err) {
      dispatch(failure(err));
    }
  };
};

export const deleteReplyThunk = (
  idx: number,
  callback: () => void
): ThunkAction<void, RootState, void, ReplyAction> => {
  return async (dispatch) => {
    const { request, success, failure } = deleteReplyAsync;
    dispatch(request());

    try {
      await requestApi(REPLY.DELETE(idx), ERequest.DELETE);

      dispatch(success());
      callback();
    } catch (err) {
      dispatch(failure(err));
    }
  };
};
