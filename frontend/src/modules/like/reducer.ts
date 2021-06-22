import { createReducer } from "typesafe-actions";
import {
  CREATE_LIKE,
  CREATE_LIKE_FAILURE,
  CREATE_LIKE_SUCCESS,
  FETCH_LIKE_INFO,
  FETCH_LIKE_INFO_FAILURE,
  FETCH_LIKE_INFO_SUCCESS,
  FETCH_LIKE_USERS,
  FETCH_LIKE_USERS_FAILURE,
  FETCH_LIKE_USERS_SUCCESS,
  INIT_LIKE_ERROR,
} from "./actions";
import { LikeAction, LikeState } from "./types";

const initialState: LikeState = {
  loading: false,
  error: null,
  data: {
    liked: false,
    likeCount: 0,
    likedUsers: [],
  },
};

const likes = createReducer<LikeState, LikeAction>(initialState, {
  [FETCH_LIKE_INFO]: (state) => ({
    ...state,
    loading: true,
    error: null,
    data: {
      ...state.data,
      liked: false,
      likeCount: 0,
    },
  }),
  [FETCH_LIKE_INFO_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: {
      ...state.data,
      ...action.payload,
    },
  }),
  [FETCH_LIKE_INFO_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: {
      ...state.data,
      liked: false,
      likeCount: 0,
    },
  }),
  [FETCH_LIKE_USERS]: (state) => ({
    ...state,
    loading: true,
    error: null,
    data: {
      ...state.data,
      likedUsers: [],
    },
  }),
  [FETCH_LIKE_USERS_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: {
      ...state.data,
      likedUsers: action.payload,
    },
  }),
  [FETCH_LIKE_USERS_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: {
      ...state.data,
      likedUsers: [],
    },
  }),
  [CREATE_LIKE]: (state) => ({
    ...state,
    error: null,
  }),
  [CREATE_LIKE_SUCCESS]: (state) => ({
    ...state,
    error: null,
  }),
  [CREATE_LIKE_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
  [INIT_LIKE_ERROR]: (state) => ({
    ...state,
    error: null,
  }),
});

export default likes;
