import { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/messaging";
import option from "config/firebase";
import { fetchMyProfileThunk, createFcmTokenThunk, initUserError, initUser } from "modules/user";
import token from "lib/token";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "modules";

export default function useFetchProfile() {
  const { loading, error, data } = useSelector((state: RootState) => state.users);
  const { login, admin, profile } = data;
  const dispatch = useDispatch();

  const history = useHistory();

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

  const handleFetchMyProfile = useCallback(() => {
    const accessToken = token.get();

    if (!profile.id && accessToken) {
      dispatch(fetchMyProfileThunk(requestNotification));
    }
  }, [profile, dispatch, requestNotification]);

  useEffect(() => {
    handleFetchMyProfile();
  }, [handleFetchMyProfile]);

  useEffect(() => {
    if (error) {
      history.push("/");
      token.remove();
      dispatch(initUser());
      dispatch(initUserError());
    }
  }, [error, history, dispatch]);

  return {
    loading,
    login,
    admin,
    profile,
  };
}
