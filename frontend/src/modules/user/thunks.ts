import ERequest from "enum/request.enum";
import token from "lib/token";
import { RootState } from "modules";
import { ThunkAction } from "redux-thunk";
import { requestApi } from "request/requestApi";
import { AUTH, PROFILE } from "request/requestUrl";
import { IAuthResponse, IProfileResponse, IProfilesResponse } from "types/user.type";
import {
  fetchAdminProfileAsync,
  fetchMyProfileAsync,
  fetchProfilesAsync,
  gitHubAuthAsync,
  createFcmTokenAsync,
} from "./actions";
import { UserAction } from "./types";

export const gitHubAuthThunk = (
  code: string,
  callback: () => void
): ThunkAction<void, RootState, void, UserAction> => {
  return async (dispatch) => {
    const { request, success, failure } = gitHubAuthAsync;
    dispatch(request());

    try {
      const body = { code };

      const { data }: IAuthResponse = await requestApi(AUTH.GITHUB, ERequest.POST, body);

      token.set(data.access_token);

      dispatch(success());
      callback();
    } catch (err) {
      dispatch(failure(err));
    }
  };
};

export const createFcmTokenThunk = (
  token: string
): ThunkAction<void, RootState, void, UserAction> => {
  return async (dispatch) => {
    const { request, success, failure } = createFcmTokenAsync;
    dispatch(request());

    try {
      const body = { token };

      await requestApi(AUTH.FCM, ERequest.POST, body);

      dispatch(success());
    } catch (err) {
      dispatch(failure(err));
    }
  };
};

export const fetchProfilesThunk = (): ThunkAction<void, RootState, void, UserAction> => {
  return async (dispatch) => {
    const { request, success, failure } = fetchProfilesAsync;
    dispatch(request());

    try {
      const { data }: IProfilesResponse = await requestApi(PROFILE.ALL, ERequest.GET);

      const result = {
        userCount: data.user_count,
        profiles: data.users,
      };

      dispatch(success(result));
    } catch (err) {
      dispatch(failure(err));
    }
  };
};

export const fetchMyProfileThunk = (
  callback: () => void
): ThunkAction<void, RootState, void, UserAction> => {
  return async (dispatch) => {
    const { request, success, failure } = fetchMyProfileAsync;
    dispatch(request());

    try {
      const { data }: IProfileResponse = await requestApi(PROFILE.MY, ERequest.GET);

      dispatch(success(data.user));
      callback();
    } catch (err) {
      dispatch(failure(err));
    }
  };
};

export const fetchAdminProfileThunk = (): ThunkAction<void, RootState, void, UserAction> => {
  return async (dispatch) => {
    const { request, success, failure } = fetchAdminProfileAsync;
    dispatch(request());

    try {
      const { data }: IProfileResponse = await requestApi(PROFILE.ADMIN, ERequest.GET);

      dispatch(success(data.user));
    } catch (err) {
      dispatch(failure(err));
    }
  };
};
