import { createReducer } from "typesafe-actions";
import {
  FETCH_TEMP_POSTS,
  FETCH_TEMP_POSTS_FAILURE,
  FETCH_TEMP_POSTS_SUCCESS,
  INIT_TEMP_ERROR,
} from "./actions";
import { TempState } from "./types";

const initialState: TempState = {
  loading: false,
  error: null,
  data: {
    posts: [],
  },
};

const temps = createReducer(initialState, {
  [FETCH_TEMP_POSTS]: (state) => ({
    ...state,
    loading: true,
    error: null,
    data: {
      ...state.data,
    },
  }),
  [FETCH_TEMP_POSTS_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: {
      ...state.data,
      posts: action.payload,
    },
  }),
  [FETCH_TEMP_POSTS_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [INIT_TEMP_ERROR]: (state) => ({
    ...state,
    error: null,
  }),
});

export default temps;
