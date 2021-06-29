import ERequest from "enum/request.enum";
import { RootState } from "modules";
import { ThunkAction } from "redux-thunk";
import { requestApi } from "request/requestApi";
import { POST } from "request/requestUrl";
import {
  IPostDTO,
  IOtherPostsResponse,
  IPostResponse,
  ICreateTempPostResponse,
} from "types/post.type";
import {
  createPostAsync,
  createTempPostAsync,
  deletePostAsync,
  fetchOtherPostsAsync,
  fetchPostAsync,
  updatePostAsync,
} from "./actions";
import { PostAction } from "./types";

export const fetchPostThunk = (idx: number): ThunkAction<void, RootState, void, PostAction> => {
  return async (dispatch) => {
    const { request, success, failure } = fetchPostAsync;
    dispatch(request());

    try {
      const { data }: IPostResponse = await requestApi(POST.GET.ONE(idx), ERequest.GET);

      const result = {
        notFound: false,
        post: data.post,
      };

      if (!data.post) {
        result.notFound = true;
      }

      dispatch(success(result));
    } catch (err) {
      console.error(err);
      dispatch(failure(err));
    }
  };
};

export const fetchOtherPostsThunk = (
  idx: number
): ThunkAction<void, RootState, void, PostAction> => {
  return async (dispatch) => {
    const { request, success, failure } = fetchOtherPostsAsync;
    dispatch(request());

    try {
      const { data }: IOtherPostsResponse = await requestApi(POST.GET.OTHER(idx), ERequest.GET);

      dispatch(success(data.other_posts));
    } catch (err) {
      dispatch(failure(err));
    }
  };
};

export const createPostThunk = (
  post: IPostDTO,
  callback: () => void
): ThunkAction<void, RootState, void, PostAction> => {
  return async (dispatch) => {
    const { request, success, failure } = createPostAsync;
    dispatch(request());

    try {
      const body = {
        title: post.title,
        description: post.description,
        content: post.content,
        thumbnail: post.thumbnail || null,
        category_idx: post.category_idx,
      };

      await requestApi(POST.CREATE.ONE, ERequest.POST, body);

      dispatch(success());
      callback();
    } catch (err) {
      dispatch(failure(err));
    }
  };
};

export const createTempPostThunk = (
  post: IPostDTO,
  callback: (idx: number) => void
): ThunkAction<void, RootState, void, PostAction> => {
  return async (dispatch) => {
    const { request, success, failure } = createTempPostAsync;
    dispatch(request());

    try {
      const body = {
        title: post.title,
        description: post.description || "임시 저장된 글.",
        content: post.content,
        thumbnail: post.thumbnail || null,
        category_idx: post.category_idx,
      };

      const { data }: ICreateTempPostResponse = await requestApi(
        POST.CREATE.TEMP,
        ERequest.POST,
        body
      );

      dispatch(success());
      callback(data.idx);
    } catch (err) {
      dispatch(failure(err));
    }
  };
};

export const updatePostThunk = (
  idx: number,
  post: IPostDTO,
  temp: boolean,
  callback: () => void
): ThunkAction<void, RootState, void, PostAction> => {
  return async (dispatch) => {
    const { request, success, failure } = updatePostAsync;
    dispatch(request());

    try {
      const body = {
        title: post.title,
        description: post.description,
        content: post.content,
        thumbnail: post.thumbnail,
        is_temp: temp,
        category_idx: post.category_idx,
      };

      await requestApi(POST.UPDATE(idx), ERequest.PUT, body);

      dispatch(success());
      callback();
    } catch (err) {
      dispatch(failure(err));
    }
  };
};

export const deletePostThunk = (
  idx: number,
  callback: () => void
): ThunkAction<void, RootState, void, PostAction> => {
  return async (dispatch) => {
    const { request, success, failure } = deletePostAsync;
    dispatch(request());

    try {
      await requestApi(POST.DELETE(idx), ERequest.DELETE);

      dispatch(success());
      callback();
    } catch (err) {
      dispatch(failure(err));
    }
  };
};
