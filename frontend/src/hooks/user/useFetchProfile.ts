import { useCallback, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/messaging";
import option from "../../config/firebase";
import axios from "axios";
import {
  changeAdmin,
  changeLogin,
  fetchMyProfileThunk,
  createFcmTokenThunk,
  initUserError,
} from "modules/user";
import token from "lib/token";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "modules";

export default function useFetchProfile() {
  const { loading, error, data } = useSelector((state: RootState) => state.users);
  const { login, admin, profile } = data;
  const dispatch = useDispatch();

  const history = useHistory();

  const accessToken = useMemo(() => token.get(), []);

  const getFcmToken = useCallback(async () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(option);
    }
    const fcmToken = await firebase.messaging().getToken();

    dispatch(createFcmTokenThunk(fcmToken));
  }, [dispatch]);

  const requestNotification = useCallback(async () => {
    if ("Notification" in window) {
      try {
        Notification.requestPermission().then((permission: NotificationPermission) => {
          if (permission === "granted") {
            getFcmToken();
          }
        });
      } catch (error) {
        if (error instanceof TypeError) {
          Notification.requestPermission((permission: NotificationPermission) => {
            if (permission === "granted") {
              getFcmToken();
            }
          });
        }
      }
    }
  }, [getFcmToken]);

  const logoutHandler = useCallback(() => {
    token.remove();
    axios.defaults.headers.common["access_token"] = "";

    dispatch(changeLogin(false));
    dispatch(changeAdmin(false));

    history.push("/");
  }, [history, dispatch]);

  const fetchMyProfileHandler = useCallback(() => {
    if (!profile.id && accessToken) {
      dispatch(fetchMyProfileThunk(requestNotification));
    }
  }, [profile, accessToken, dispatch, requestNotification]);

  useEffect(() => {
    fetchMyProfileHandler();
  }, [fetchMyProfileHandler]);

  useEffect(() => {
    if (error) {
      history.push("/");
      logoutHandler();
      dispatch(initUserError());
    }
  }, [error, history, logoutHandler, dispatch]);

  return {
    loading,
    login,
    admin,
    profile,
    accessToken,
    logoutHandler,
  };
}
