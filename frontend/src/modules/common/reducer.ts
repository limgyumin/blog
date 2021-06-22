import { createReducer } from "typesafe-actions";
import {
  FETCH_POSTS,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_SUCCESS,
  INCREASE_PAGE,
  INIT_COMMON_ERROR,
  RESET_PAGE,
} from "./actions";
import { CommonAction, CommonState } from "./types";

const initialState: CommonState = {
  loading: false,
  error: null,
  data: {
    page: 1,
    category: -1,
    notFound: false,
    total: 0,
    posts: [],
  },
};

const commons = createReducer<CommonState, CommonAction>(initialState, {
  [FETCH_POSTS]: (state, action) => {
    if (state.data.page === 1) {
      return {
        ...state,
        loading: true,
        error: null,
        data: {
          ...state.data,
          page: 1,
          notFound: false,
          category: action.payload,
          posts: [],
        },
      };
    }
    return {
      ...state,
      loading: true,
      error: null,
      data: {
        ...state.data,
        notFound: false,
        category: action.payload,
      },
    };
  },
  [FETCH_POSTS_SUCCESS]: (state, action) => {
    if (state.data.page === 1) {
      return {
        ...state,
        loading: false,
        error: null,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    }
    return {
      ...state,
      loading: false,
      error: null,
      data: {
        ...state.data,
        ...action.payload,
        posts: [...state.data.posts, ...action.payload.posts],
      },
    };
  },
  [FETCH_POSTS_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [INCREASE_PAGE]: (state) => ({
    ...state,
    data: {
      ...state.data,
      page: state.data.page + 1,
    },
  }),
  [RESET_PAGE]: (state) => ({
    ...state,
    data: {
      ...state.data,
      page: 1,
    },
  }),
  [INIT_COMMON_ERROR]: (state) => ({
    ...state,
    error: null,
  }),
});

export default commons;
