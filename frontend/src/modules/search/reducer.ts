import { createReducer } from "typesafe-actions";
import {
  FETCH_SEARCHED_POSTS,
  FETCH_SEARCHED_POSTS_FAILURE,
  FETCH_SEARCHED_POSTS_SUCCESS,
  INIT_SEARCH_ERROR,
} from "./actions";
import { SearchAction, SearchState } from "./types";

const initialState: SearchState = {
  loading: false,
  error: null,
  data: {
    total: 0,
    notFound: false,
    posts: [],
  },
};

const searches = createReducer<SearchState, SearchAction>(initialState, {
  [FETCH_SEARCHED_POSTS]: (state) => ({
    ...state,
    loading: true,
    error: null,
    data: {
      total: 0,
      notFound: false,
      posts: [],
    },
  }),
  [FETCH_SEARCHED_POSTS_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: action.payload,
  }),
  [FETCH_SEARCHED_POSTS_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: {
      total: 0,
      notFound: false,
      posts: [],
    },
  }),
  [INIT_SEARCH_ERROR]: (state) => ({
    ...state,
    error: null,
  }),
});

export default searches;
