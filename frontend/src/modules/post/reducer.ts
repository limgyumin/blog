import { initialOtherPostsState, initialPostState } from "types/initials/post.initial";
import { createReducer } from "typesafe-actions";
import {
  CREATE_POST,
  CREATE_POST_FAILURE,
  CREATE_POST_SUCCESS,
  DELETE_POST,
  DELETE_POST_FAILURE,
  DELETE_POST_SUCCESS,
  FETCH_OTHER_POSTS,
  FETCH_OTHER_POSTS_FAILURE,
  FETCH_OTHER_POSTS_SUCCESS,
  FETCH_POST,
  FETCH_POST_FAILURE,
  FETCH_POST_SUCCESS,
  INIT_POST_ERROR,
  INIT_POST,
  UPDATE_POST,
  UPDATE_POST_FAILURE,
  UPDATE_POST_SUCCESS,
} from "./actions";
import { PostAction, PostState } from "./types";

const initialState: PostState = {
  loading: false,
  error: null,
  data: {
    notFound: false,
    post: initialPostState,
    otherPosts: initialOtherPostsState,
  },
};

const posts = createReducer<PostState, PostAction>(initialState, {
  [FETCH_POST]: (state) => ({
    ...state,
    loading: true,
    error: null,
    data: {
      ...state.data,
      notFound: false,
      post: initialPostState,
    },
  }),
  [FETCH_POST_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: {
      ...state.data,
      ...action.payload,
      post: action.payload.post,
    },
  }),
  [FETCH_POST_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: {
      ...state.data,
      notFound: false,
      post: initialPostState,
    },
  }),
  [FETCH_OTHER_POSTS]: (state) => ({
    ...state,
    loading: true,
    error: null,
    data: {
      ...state.data,
      otherPosts: initialOtherPostsState,
    },
  }),
  [FETCH_OTHER_POSTS_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: {
      ...state.data,
      otherPosts: action.payload,
    },
  }),
  [FETCH_OTHER_POSTS_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: {
      ...state.data,
      otherPosts: initialOtherPostsState,
    },
  }),
  [CREATE_POST]: (state) => ({
    ...state,
    error: null,
  }),
  [CREATE_POST_SUCCESS]: (state) => ({
    ...state,
    error: null,
  }),
  [CREATE_POST_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
  [UPDATE_POST]: (state) => ({
    ...state,
    error: null,
  }),
  [UPDATE_POST_SUCCESS]: (state) => ({
    ...state,
    error: null,
  }),
  [UPDATE_POST_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
  [DELETE_POST]: (state) => ({
    ...state,
    error: null,
  }),
  [DELETE_POST_SUCCESS]: (state) => ({
    ...state,
    error: null,
  }),
  [DELETE_POST_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload,
    data: {
      ...state.data,
      post: initialPostState,
    },
  }),
  [INIT_POST_ERROR]: (state) => ({
    ...state,
    error: null,
  }),
  [INIT_POST]: (state) => ({
    ...state,
    data: {
      ...state.data,
      post: initialPostState,
    },
  }),
});

export default posts;
