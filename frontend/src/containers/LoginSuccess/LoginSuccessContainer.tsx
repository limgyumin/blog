import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react";
import queryString from "query-string";
import LoginSuccess from "../../components/LoginSuccess";
import { useHistory } from "react-router-dom";
import useStore from "../../util/lib/hooks/useStore";

interface LoginSuccessContainerProps {}

const LoginSuccessContainer = ({}: LoginSuccessContainerProps) => {
  const { store } = useStore();
  const { handleLogin } = store.UserStore;
  const history = useHistory();

  const handleLoginCallback = useCallback(async () => {
    const { code } = queryString.parse(location.search);

    await handleLogin(String(code)).then((res: any) => {
      localStorage.setItem("access_token", res.data.access_token);
      console.log("히힝 로그인 왕료");
      history.push("/");
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

export default observer(LoginSuccessContainer);
