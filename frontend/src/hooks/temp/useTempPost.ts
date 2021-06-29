import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useModal from "hooks/common/useModal";
import { RootState } from "modules";
import { deletePostThunk } from "modules/post";
import { fetchTempPostsThunk } from "modules/temp/thunks";

export default function useTempPost() {
  const { login, admin } = useSelector((state: RootState) => state.users.data);

  const dispatch = useDispatch();

  const [postIdx, setPostIdx] = useState<number>(0);

  const { isMount, handleModalMount } = useModal();

  const handleDeleteTempPost = useCallback(() => {
    if (!login || !admin) return;

    const onDeletePost = () => {
      handleModalMount();
      setPostIdx(0);
      dispatch(fetchTempPostsThunk());
    };

    dispatch(deletePostThunk(postIdx, onDeletePost));
  }, [login, admin, postIdx, dispatch, handleModalMount]);

  const handleClickDeleteTempPost = useCallback(
    (idx: number) => {
      setPostIdx(idx);
      handleModalMount();
    },
    [handleModalMount]
  );

  useEffect(() => {
    return () => setPostIdx(0);
  }, []);

  return {
    isMount,
    handleModalMount,
    handleClickDeleteTempPost,
    handleDeleteTempPost,
  };
}
