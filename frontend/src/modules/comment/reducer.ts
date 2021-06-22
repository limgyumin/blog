import { createReducer } from "typesafe-actions";
import {
  CREATE_COMMENT,
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_SUCCESS,
  DELETE_COMMENT,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
  FETCH_COMMENTS,
  FETCH_COMMENTS_FAILURE,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENT_COUNT,
  FETCH_COMMENT_COUNT_FAILURE,
  FETCH_COMMENT_COUNT_SUCCESS,
  INIT_COMMENT_ERROR,
  UPDATE_COMMENT,
  UPDATE_COMMENT_FAILURE,
  UPDATE_COMMENT_SUCCESS,
} from "./actions";
import { CommentAction, CommentState } from "./types";

const initialState: CommentState = {
  loading: false,
  error: null,
  data: {
    commentCount: 0,
    comments: [],
  },
};

const comments = createReducer<CommentState, CommentAction>(initialState, {
  [FETCH_COMMENT_COUNT]: (state) => ({
    ...state,
    loading: true,
    error: null,
    data: {
      ...state.data,
    },
  }),
  [FETCH_COMMENT_COUNT_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: {
      ...state.data,
      commentCount: action.payload,
    },
  }),
  [FETCH_COMMENT_COUNT_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: {
      ...state.data,
    },
  }),
  [FETCH_COMMENTS]: (state) => ({
    ...state,
    loading: true,
    error: null,
    data: {
      ...state.data,
    },
  }),
  [FETCH_COMMENTS_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: {
      ...state.data,
      comments: action.payload,
    },
  }),
  [FETCH_COMMENTS_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: {
      commentCount: 0,
      comments: [],
    },
  }),
  [CREATE_COMMENT]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [CREATE_COMMENT_SUCCESS]: (state) => ({
    ...state,
    loading: false,
    error: null,
  }),
  [CREATE_COMMENT_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [UPDATE_COMMENT]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [UPDATE_COMMENT_SUCCESS]: (state) => ({
    ...state,
    loading: false,
    error: null,
  }),
  [UPDATE_COMMENT_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [DELETE_COMMENT]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [DELETE_COMMENT_SUCCESS]: (state) => ({
    ...state,
    loading: false,
    error: null,
  }),
  [DELETE_COMMENT_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [INIT_COMMENT_ERROR]: (state) => ({
    ...state,
    error: null,
  }),
});

export default comments;
