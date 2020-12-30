import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react";
import Auth from "../../components/Auth";
import { useHistory } from "react-router-dom";
import useStore from "../../util/lib/hooks/useStore";
import useQuery from "../../util/lib/hooks/useQuery";
import { AuthResponse } from "../../util/types/Response";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AuthContainerProps {}

const AuthContainer = ({}: AuthContainerProps) => {
  const { store } = useStore();
  const { handleAuth } = store.UserStore;
  const history = useHistory();
  const query = useQuery();

  const handleAuthCallback = useCallback(async () => {
    const code = query.get("code");

    await handleAuth(String(code))
      .then((res: AuthResponse) => {
        if (res.status === 200) {
          localStorage.setItem("access_token", res.data.access_token);
          history.push("/");
        }
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
    handleAuthCallback();
  }, [handleAuthCallback]);

  return (
    <>
      <Auth />
    </>
  );
};

export default observer(AuthContainer);
