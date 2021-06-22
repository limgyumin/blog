import { initialUserState } from "types/initials/user.initial";
import { createReducer } from "typesafe-actions";
import {
  CHANGE_ADMIN,
  CHANGE_LOGIN,
  FETCH_ADMIN_PROFILE,
  FETCH_ADMIN_PROFILE_FAILURE,
  FETCH_ADMIN_PROFILE_SUCCESS,
  FETCH_MY_PROFILE,
  FETCH_MY_PROFILE_FAILURE,
  FETCH_MY_PROFILE_SUCCESS,
  FETCH_PROFILES,
  FETCH_PROFILES_FAILURE,
  FETCH_PROFILES_SUCCESS,
  GITHUB_AUTH,
  GITHUB_AUTH_FAILURE,
  GITHUB_AUTH_SUCCESS,
  CREATE_FCM_TOKEN,
  CREATE_FCM_TOKEN_FAILURE,
  CREATE_FCM_TOKEN_SUCCESS,
  INIT_USER_ERROR,
} from "./actions";
import { UserAction, UserState } from "./types";

const initialState: UserState = {
  loading: false,
  error: null,
  data: {
    login: false,
    admin: false,
    userCount: 0,
    profiles: [],
    profile: initialUserState,
    adminProfile: initialUserState,
  },
};

const users = createReducer<UserState, UserAction>(initialState, {
  [GITHUB_AUTH]: (state) => ({
    ...state,
    loading: true,
    error: null,
    data: {
      ...state.data,
      login: false,
    },
  }),
  [GITHUB_AUTH_SUCCESS]: (state) => ({
    ...state,
    loading: false,
    error: null,
    data: {
      ...state.data,
      login: true,
    },
  }),
  [GITHUB_AUTH_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: {
      ...state.data,
      login: false,
    },
  }),
  [CREATE_FCM_TOKEN]: (state) => ({
    ...state,
    error: null,
  }),
  [CREATE_FCM_TOKEN_SUCCESS]: (state) => ({
    ...state,
    error: null,
  }),
  [CREATE_FCM_TOKEN_FAILURE]: (state) => ({
    ...state,
  }),
  [CHANGE_LOGIN]: (state, action) => ({
    ...state,
    data: {
      ...state.data,
      login: action.payload,
    },
  }),
  [CHANGE_ADMIN]: (state, action) => ({
    ...state,
    data: {
      ...state.data,
      admin: action.payload,
    },
  }),
  [FETCH_PROFILES]: (state) => ({
    ...state,
    loading: true,
    error: null,
    data: {
      ...state.data,
      userCount: 0,
      profiles: [],
    },
  }),
  [FETCH_PROFILES_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: {
      ...state.data,
      ...action.payload,
    },
  }),
  [FETCH_PROFILES_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: {
      ...state.data,
      userCount: 0,
      profiles: [],
    },
  }),
  [FETCH_MY_PROFILE]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [FETCH_MY_PROFILE_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: {
      ...state.data,
      login: true,
      profile: action.payload,
    },
  }),
  [FETCH_MY_PROFILE_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: {
      ...state.data,
      login: false,
      admin: false,
      profile: initialUserState,
    },
  }),
  [FETCH_ADMIN_PROFILE]: (state) => ({
    ...state,
    loading: true,
    error: null,
    data: {
      ...state.data,
      adminProfile: initialUserState,
    },
  }),
  [FETCH_ADMIN_PROFILE_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: {
      ...state.data,
      adminProfile: action.payload,
    },
  }),
  [FETCH_ADMIN_PROFILE_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: {
      ...state.data,
      adminProfile: initialUserState,
    },
  }),
  [INIT_USER_ERROR]: (state) => ({
    ...state,
    error: null,
  }),
});

export default users;
