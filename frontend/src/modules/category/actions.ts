import { AxiosError } from "axios";
import { ICategory, ICategoryPosts } from "types/category.type";
import { IResponse } from "types/response.type";
import { createAction, createAsyncAction } from "typesafe-actions";

export const FETCH_CATEGORIES = "category/FETCH_CATEGORIES";
export const FETCH_CATEGORIES_SUCCESS = "category/FETCH_CATEGORIES_SUCCESS";
export const FETCH_CATEGORIES_FAILURE = "category/FETCH_CATEGORIES_FAILURE";

export const FETCH_CATEGORY_POSTS = "category/FETCH_CATEGORY_POSTS";
export const FETCH_CATEGORY_POSTS_SUCCESS = "category/FETCH_CATEGORY_POSTS_SUCCESS";
export const FETCH_CATEGORY_POSTS_FAILURE = "category/FETCH_CATEGORY_POSTS_FAILURE";

export const CREATE_CATEGORY = "category/CREATE_CATEGORY";
export const CREATE_CATEGORY_SUCCESS = "category/CREATE_CATEGORY_SUCCESS";
export const CREATE_CATEGORY_FAILURE = "category/CREATE_CATEGORY_FAILURE";

export const UPDATE_CATEGORY = "category/UPDATE_CATEGORY";
export const UPDATE_CATEGORY_SUCCESS = "category/UPDATE_CATEGORY_SUCCESS";
export const UPDATE_CATEGORY_FAILURE = "category/UPDATE_CATEGORY_FAILURE";

export const DELETE_CATEGORY = "category/DELETE_CATEGORY";
export const DELETE_CATEGORY_SUCCESS = "category/DELETE_CATEGORY_SUCCESS";
export const DELETE_CATEGORY_FAILURE = "category/DELETE_CATEGORY_FAILURE";

export const INIT_CATEGORY_ERROR = "category/INIT_CATEGORY_ERROR";

export const fetchCategoriesAsync = createAsyncAction(
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE
)<void, { totalPostCount: number; categories: ICategory[] }, AxiosError<IResponse>>();

export const fetchCategoryPostsAsync = createAsyncAction(
  FETCH_CATEGORY_POSTS,
  FETCH_CATEGORY_POSTS_SUCCESS,
  FETCH_CATEGORY_POSTS_FAILURE
)<void, ICategoryPosts[], AxiosError<IResponse>>();

export const createCategoryAsync = createAsyncAction(
  CREATE_CATEGORY,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE
)<void, void, AxiosError<IResponse>>();

export const updateCategoryAsync = createAsyncAction(
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE
)<void, void, AxiosError<IResponse>>();

export const deleteCategoryAsync = createAsyncAction(
  DELETE_CATEGORY,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE
)<void, void, AxiosError<IResponse>>();

export const initCategoryError = createAction(INIT_CATEGORY_ERROR)();
