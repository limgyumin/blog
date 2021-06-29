import { initialUserState } from "types/initials/user.initial";
import { createReducer } from "typesafe-actions";
import {
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
  INIT_USER,
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
  }),
  [GITHUB_AUTH_SUCCESS]: (state) => ({
    ...state,
    loading: false,
    error: null,
  }),
  [GITHUB_AUTH_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
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
    data: {
      ...state.data,
      login: false,
      admin: false,
      profile: initialUserState,
    },
  }),
  [FETCH_MY_PROFILE_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: {
      ...state.data,
      login: true,
      admin: action.payload.is_admin,
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
  [INIT_USER]: (state) => ({
    ...state,
    data: {
      ...state.data,
      login: false,
      admin: false,
      profile: initialUserState,
    },
  }),
  [INIT_USER_ERROR]: (state) => ({
    ...state,
    error: null,
  }),
});

export default users;
