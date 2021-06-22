import ERequest from "enum/request.enum";
import { RootState } from "modules";
import { ThunkAction } from "redux-thunk";
import { requestApi } from "request/requestApi";
import { CATEGORY } from "request/requestUrl";
import { ICategoriesResponse, ICategoryPostsResponse } from "types/category.type";
import {
  createCategoryAsync,
  deleteCategoryAsync,
  fetchCategoriesAsync,
  fetchCategoryPostsAsync,
  updateCategoryAsync,
} from "./actions";
import { CategoryAction } from "./types";

export const fetchCategoriesThunk = (): ThunkAction<void, RootState, void, CategoryAction> => {
  return async (dispatch) => {
    const { request, success, failure } = fetchCategoriesAsync;
    dispatch(request());

    try {
      const { data }: ICategoriesResponse = await requestApi(CATEGORY.GET.ALL, ERequest.GET);

      const result = {
        totalPostCount: data.total,
        categories: data.categories,
      };

      dispatch(success(result));
    } catch (err) {
      dispatch(failure(err));
    }
  };
};

export const fetchCategoryPostsThunk = (): ThunkAction<void, RootState, void, CategoryAction> => {
  return async (dispatch) => {
    const { request, success, failure } = fetchCategoryPostsAsync;
    dispatch(request());

    try {
      const { data }: ICategoryPostsResponse = await requestApi(CATEGORY.GET.POSTS, ERequest.GET);

      dispatch(success(data.categories));
    } catch (err) {
      dispatch(failure(err));
    }
  };
};

export const createCategoryThunk = (
  name: string
): ThunkAction<void, RootState, void, CategoryAction> => {
  return async (dispatch) => {
    const { request, success, failure } = createCategoryAsync;
    dispatch(request());

    const body = {
      name,
    };

    try {
      await requestApi(CATEGORY.CREATE, ERequest.POST, body);

      dispatch(success());
      dispatch(fetchCategoriesThunk());
      dispatch(fetchCategoryPostsThunk());
    } catch (err) {
      dispatch(failure(err));
    }
  };
};

export const updateCategoryThunk = (
  idx: number,
  name: string
): ThunkAction<void, RootState, void, CategoryAction> => {
  return async (dispatch) => {
    const { request, success, failure } = updateCategoryAsync;
    dispatch(request());

    const body = {
      name,
    };

    try {
      await requestApi(CATEGORY.UPDATE(idx), ERequest.PUT, body);

      dispatch(success());
      dispatch(fetchCategoriesThunk());
      dispatch(fetchCategoryPostsThunk());
    } catch (err) {
      dispatch(failure(err));
    }
  };
};

export const deleteCategoryThunk = (
  idx: number
): ThunkAction<void, RootState, void, CategoryAction> => {
  return async (dispatch) => {
    const { request, success, failure } = deleteCategoryAsync;
    dispatch(request());

    try {
      await requestApi(CATEGORY.DELETE(idx), ERequest.DELETE);

      dispatch(success());
      dispatch(fetchCategoriesThunk());
      dispatch(fetchCategoryPostsThunk());
    } catch (err) {
      dispatch(failure(err));
    }
  };
};
