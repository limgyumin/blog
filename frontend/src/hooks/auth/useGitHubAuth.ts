import useQueryString from "hooks/util/useQueryString";
import { RootState } from "modules";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { changeLogin, gitHubAuthThunk, initUserError } from "modules/user";

export default function useGitHubAuth() {
  const { error } = useSelector((state: RootState) => state.users);

  const dispatch = useDispatch();

  const history = useHistory();
  const code = useQueryString("code");

  const push = useCallback(() => {
    history.push("/");
  }, [history]);

  const gitHubAuthHandler = useCallback(() => {
    dispatch(gitHubAuthThunk(code, push));
  }, [code, dispatch, push]);

  useEffect(() => {
    gitHubAuthHandler();
  }, [gitHubAuthHandler]);

  useEffect(() => {
    if (error && error.response) {
      if (error.response.status === 400) {
        dispatch(changeLogin(true));
      } else {
        toast.error("회원관리 부분에서 오류가 발생했어요!");
      }
      history.push("/");
      dispatch(initUserError());
    }
  }, [error, history, dispatch]);
}
