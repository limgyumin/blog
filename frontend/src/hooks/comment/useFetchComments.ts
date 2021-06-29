import usePostIdx from "hooks/util/usePostIdx";
import { RootState } from "modules";
import { fetchCommentCountThunk, fetchCommentsThunk, initCommentError } from "modules/comment";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export default function useFetchComments() {
  const { loading, error, data } = useSelector((state: RootState) => state.comments);
  const { commentCount, comments } = data;

  const dispatch = useDispatch();

  const postIdx = usePostIdx();
  const history = useHistory();

  const handleFetchCommentCount = useCallback(() => {
    dispatch(fetchCommentCountThunk(postIdx));
  }, [postIdx, dispatch]);

  const handleFetchComments = useCallback(() => {
    dispatch(fetchCommentsThunk(postIdx));
  }, [postIdx, dispatch]);

  useEffect(() => {
    handleFetchCommentCount();
  }, [handleFetchCommentCount]);

  useEffect(() => {
    if (commentCount) {
      handleFetchComments();
    }
  }, [commentCount, handleFetchComments]);

  useEffect(() => {
    if (error) {
      toast.error("댓글 부분에서 오류가 발생했어요!");
      dispatch(initCommentError());
      history.push("/");
    }
  }, [error, history, dispatch]);

  return {
    loading,
    commentCount,
    comments,
  };
}
