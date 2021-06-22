import { useCallback, useEffect } from "react";
import { RootState } from "modules";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchTempPostsThunk, initTempError } from "modules/temp";

export default function useFetchTempPosts() {
  const { login, admin } = useSelector((state: RootState) => state.users.data);
  const { loading, error, data } = useSelector((state: RootState) => state.temps);
  const { posts } = data;

  const dispatch = useDispatch();

  const history = useHistory();

  const fetchTempPostsHandler = useCallback(() => {
    if (!login || !admin) return;

    dispatch(fetchTempPostsThunk());
  }, [login, admin, dispatch]);

  useEffect(() => {
    if (!login || !admin) {
      history.push("/");
    }
  }, [login, admin, history]);

  useEffect(() => {
    fetchTempPostsHandler();
  }, [fetchTempPostsHandler]);

  useEffect(() => {
    if (error) {
      toast.error("임시 글 부분에서 오류가 발생했어요!");
      dispatch(initTempError());
      history.push("/");
    }
  }, [error, history, dispatch]);

  return {
    loading,
    posts,
  };
}
