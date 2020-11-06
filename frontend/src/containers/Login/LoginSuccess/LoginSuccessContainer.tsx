import React, { useCallback, useEffect } from "react";
import { inject, observer } from "mobx-react";
import queryString from "query-string";
import LoginSuccess from "../../../components/Login/LoginSuccess";
import UserStore from "../../../stores/User";

interface LoginSuccessContainerProps {
  store?: StoreType;
}

interface StoreType {
  UserStore: UserStore;
}

const LoginSuccessContainer = ({ store }: LoginSuccessContainerProps) => {
  const { handleLogin } = store!.UserStore;

  const handleLoginCallback = useCallback(async () => {
    const { code } = queryString.parse(location.search);

    console.log(String(code));

    await handleLogin(String(code)).then((res: any) => {
      localStorage.setItem("access_token", res.data.access_token);
      console.log("히힝 로그인 왕료");
    });
  }, []);

  useEffect(() => {
    handleLoginCallback();
  }, []);

  return (
    <>
      <LoginSuccess />
    </>
  );
};

export default inject("store")(observer(LoginSuccessContainer));
