import { useCallback } from "react";
import { deletePostThunk } from "modules/post";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import usePostIdx from "hooks/util/usePostIdx";

export default function usePost() {
  const dispatch = useDispatch();

  const history = useHistory();
  const postIdx = usePostIdx();

  const onUpdateHandler = useCallback(() => {
    history.push(`/update/${postIdx}`);
  }, [history, postIdx]);

  const deletePostHandler = useCallback(() => {
    const push = () => {
      history.push("/");
    };

    dispatch(deletePostThunk(postIdx, push));
  }, [postIdx, history, dispatch]);

  return {
    onUpdateHandler,
    deletePostHandler,
  };
}
