import { createReducer } from "typesafe-actions";
import {
  CREATE_CATEGORY,
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY,
  DELETE_CATEGORY_FAILURE,
  DELETE_CATEGORY_SUCCESS,
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORY_POSTS,
  FETCH_CATEGORY_POSTS_FAILURE,
  FETCH_CATEGORY_POSTS_SUCCESS,
  INIT_CATEGORY_ERROR,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_FAILURE,
  UPDATE_CATEGORY_SUCCESS,
} from "./actions";
import { CategoryAction, CategoryState } from "./types";

const initialState: CategoryState = {
  loading: false,
  error: null,
  data: {
    totalPostCount: 0,
    categories: [],
    categoryPosts: [],
  },
};

const categories = createReducer<CategoryState, CategoryAction>(initialState, {
  [FETCH_CATEGORIES]: (state) => ({
    ...state,
    loading: true,
    error: null,
    data: {
      ...state.data,
      totalPostCount: 0,
      categories: [],
    },
  }),
  [FETCH_CATEGORIES_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: {
      ...state.data,
      ...action.payload,
    },
  }),
  [FETCH_CATEGORIES_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: {
      ...state.data,
      totalPostCount: 0,
      categories: [],
    },
  }),
  [FETCH_CATEGORY_POSTS]: (state) => ({
    ...state,
    loading: true,
    error: null,
    data: {
      ...state.data,
    },
  }),
  [FETCH_CATEGORY_POSTS_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: {
      ...state.data,
      categoryPosts: action.payload,
    },
  }),
  [FETCH_CATEGORY_POSTS_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: {
      ...state.data,
      categoryPosts: [],
    },
  }),
  [CREATE_CATEGORY]: (state) => ({
    ...state,
    error: null,
  }),
  [CREATE_CATEGORY_SUCCESS]: (state) => ({
    ...state,
    error: null,
  }),
  [CREATE_CATEGORY_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
  [UPDATE_CATEGORY]: (state) => ({
    ...state,
    error: null,
  }),
  [UPDATE_CATEGORY_SUCCESS]: (state) => ({
    ...state,
    error: null,
  }),
  [UPDATE_CATEGORY_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
  [DELETE_CATEGORY]: (state) => ({
    ...state,
    error: null,
  }),
  [DELETE_CATEGORY_SUCCESS]: (state) => ({
    ...state,
    error: null,
  }),
  [DELETE_CATEGORY_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
  [INIT_CATEGORY_ERROR]: (state) => ({
    ...state,
    error: null,
  }),
});

export default categories;
