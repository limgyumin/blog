import { useCallback, useEffect } from "react";
import usePostIdx from "hooks/util/usePostIdx";
import { RootState } from "modules";
import { useDispatch, useSelector } from "react-redux";
import { fetchLikeUsersThunk } from "modules/like";

export default function useFetchLikeUsers() {
  const { data } = useSelector((state: RootState) => state.likes);
  const { likeCount, likedUsers } = data;

  const dispatch = useDispatch();

  const postIdx = usePostIdx();

  const fetchLikeUsersHandler = useCallback(() => {
    dispatch(fetchLikeUsersThunk(postIdx));
  }, [postIdx, dispatch]);

  useEffect(() => {
    fetchLikeUsersHandler();
  }, [fetchLikeUsersHandler]);

  return {
    likeCount,
    likedUsers,
  };
}
