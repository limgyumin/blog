import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useModal from "hooks/util/useModal";
import { RootState } from "modules";
import { deletePostThunk } from "modules/post";
import { fetchTempPostsThunk } from "modules/temp/thunks";

export default function useTempPost() {
  const { login, admin } = useSelector((state: RootState) => state.users.data);

  const dispatch = useDispatch();

  const [postIdx, setPostIdx] = useState<number>(0);

  const { isMount, onMount } = useModal();

  const deleteTempPostHandler = useCallback(() => {
    if (!login || !admin) return;

    const onDeletePost = () => {
      onMount();
      setPostIdx(0);
      dispatch(fetchTempPostsThunk());
    };

    dispatch(deletePostThunk(postIdx, onDeletePost));
  }, [login, admin, postIdx, dispatch, onMount, setPostIdx]);

  const onDeleteHandler = useCallback(
    (idx: number) => {
      setPostIdx(idx);
      onMount();
    },
    [setPostIdx, onMount]
  );

  return {
    isMount,
    onMount,
    onDeleteHandler,
    deleteTempPostHandler,
  };
}
