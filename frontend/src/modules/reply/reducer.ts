import { createReducer } from "typesafe-actions";
import {
  CREATE_REPLY,
  CREATE_REPLY_FAILURE,
  CREATE_REPLY_SUCCESS,
  UPDATE_REPLY,
  UPDATE_REPLY_FAILURE,
  UPDATE_REPLY_SUCCESS,
  DELETE_REPLY,
  DELETE_REPLY_FAILURE,
  DELETE_REPLY_SUCCESS,
  INIT_REPLY_ERROR,
} from "./actions";
import { ReplyAction, ReplyState } from "./types";

const initialState: ReplyState = {
  loading: false,
  error: null,
};

const replies = createReducer<ReplyState, ReplyAction>(initialState, {
  [CREATE_REPLY]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [CREATE_REPLY_SUCCESS]: (state) => ({
    ...state,
    loading: false,
    error: null,
  }),
  [CREATE_REPLY_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [UPDATE_REPLY]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [UPDATE_REPLY_SUCCESS]: (state) => ({
    ...state,
    loading: false,
    error: null,
  }),
  [UPDATE_REPLY_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [DELETE_REPLY]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [DELETE_REPLY_SUCCESS]: (state) => ({
    ...state,
    loading: false,
    error: null,
  }),
  [DELETE_REPLY_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [INIT_REPLY_ERROR]: (state) => ({
    ...state,
    error: null,
  }),
});

export default replies;
