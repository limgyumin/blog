import usePostIdx from "hooks/util/usePostIdx";
import { RootState } from "modules";
import { createLikeThunk, fetchLikeInfoThunk, initLikeError } from "modules/like";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export default function useBottomBar() {
  const { error, data } = useSelector((state: RootState) => state.likes);
  const { login } = useSelector((state: RootState) => state.users.data);
  const { liked, likeCount } = data;

  const dispatch = useDispatch();

  const postIdx = usePostIdx();
  const history = useHistory();

  const handleFetchLikeInfo = useCallback(() => {
    dispatch(fetchLikeInfoThunk(postIdx));
  }, [postIdx, dispatch]);

  const handleCreateLike = useCallback(() => {
    dispatch(createLikeThunk(postIdx));
  }, [postIdx, dispatch]);

  const handleClickCreateLike = useCallback(() => {
    if (!login) {
      toast.info("로그인 후 좋아요를 추가하실 수 있어요.");
      return;
    }
    handleCreateLike();
  }, [login, handleCreateLike]);

  useEffect(() => {
    handleFetchLikeInfo();
  }, [handleFetchLikeInfo]);

  useEffect(() => {
    if (error) {
      toast.error("좋아요 부분에서 오류가 발생했어요!");
      dispatch(initLikeError());
      history.push("/");
    }
  }, [error, history, dispatch]);

  return {
    liked,
    likeCount,
    handleClickCreateLike,
  };
}
