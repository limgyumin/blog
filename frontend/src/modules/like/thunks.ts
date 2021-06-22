import ERequest from "enum/request.enum";
import { RootState } from "modules";
import { ThunkAction } from "redux-thunk";
import { requestApi } from "request/requestApi";
import { LIKE } from "request/requestUrl";
import { ILikedUsersResponse, ILikeInfoResponse } from "types/post.type";
import { createLikeAsync, fetchLikeInfoAsync, fetchLikeUsersAsync } from "./actions";
import { LikeAction } from "./types";

export const fetchLikeInfoThunk = (idx: number): ThunkAction<void, RootState, void, LikeAction> => {
  return async (dispatch) => {
    const { request, success, failure } = fetchLikeInfoAsync;
    dispatch(request());

    try {
      const { data }: ILikeInfoResponse = await requestApi(LIKE.GET.INFO(idx), ERequest.GET);

      const result = {
        liked: data.liked,
        likeCount: data.like_count,
      };

      dispatch(success(result));
    } catch (err) {
      dispatch(failure(err));
    }
  };
};

export const fetchLikeUsersThunk = (
  idx: number
): ThunkAction<void, RootState, void, LikeAction> => {
  return async (dispatch) => {
    const { request, success, failure } = fetchLikeUsersAsync;
    dispatch(request());

    try {
      const { data }: ILikedUsersResponse = await requestApi(LIKE.GET.USERS(idx), ERequest.GET);

      dispatch(success(data.liked_users));
    } catch (err) {
      dispatch(failure(err));
    }
  };
};

export const createLikeThunk = (idx: number): ThunkAction<void, RootState, void, LikeAction> => {
  return async (dispatch) => {
    const { request, success, failure } = createLikeAsync;
    dispatch(request());

    try {
      const body = {
        post_idx: idx,
      };

      await requestApi(LIKE.CREATE, ERequest.POST, body);

      dispatch(success());
      dispatch(fetchLikeInfoThunk(idx));
    } catch (err) {
      dispatch(failure(err));
    }
  };
};
