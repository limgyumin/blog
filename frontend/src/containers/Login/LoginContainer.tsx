import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react";
import Login from "../../components/Login";
import { useHistory } from "react-router-dom";
import useStore from "../../util/lib/hooks/useStore";
import useQuery from "../../util/lib/hooks/useQuery";
import { LoginResponse } from "../../util/types/Response";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginContainerProps {}

const LoginContainer = ({}: LoginContainerProps) => {
  const { store } = useStore();
  const { handleLogin } = store.UserStore;
  const history = useHistory();
  const query = useQuery();

  const handleLoginCallback = useCallback(async () => {
    const code = query.get("code");

    await handleLogin(String(code))
      .then((res: LoginResponse) => {
        localStorage.setItem("access_token", res.data.access_token);
        history.push("/");
      })
      .catch((err: Error) => {
        if (err.message.indexOf("400")) {
          history.push("/");
        } else {
          toast.error("이런! 어딘가 문제가 있어요.");
          history.push("/");
        }
      });
  }, []);

  useEffect(() => {
    handleLoginCallback();
  }, [handleLoginCallback]);

  return (
    <>
      <Login />
    </>
  );
};

export default observer(LoginContainer);
