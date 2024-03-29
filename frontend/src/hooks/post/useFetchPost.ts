import { useCallback, useEffect, useRef } from "react";
import { RootState } from "modules";
import { fetchOtherPostsThunk, fetchPostThunk, initPost, initPostError } from "modules/post";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import usePostIdx from "hooks/util/usePostIdx";

export default function useFetchPost() {
  const { loading, error, data } = useSelector((state: RootState) => state.posts);
  const { admin } = useSelector((state: RootState) => state.users.data);
  const { notFound, post, otherPosts } = data;

  const dispatch = useDispatch();

  const postTopEl = useRef<HTMLDivElement>(null);

  const postIdx = usePostIdx();

  const handleFetchPost = useCallback(() => {
    dispatch(fetchPostThunk(postIdx));
  }, [postIdx, dispatch]);

  const handleFetchOtherPosts = useCallback(() => {
    dispatch(fetchOtherPostsThunk(postIdx));
  }, [postIdx, dispatch]);

  const handleScrollTop = useCallback(
    (behavior: ScrollBehavior = "auto") => {
      const { current } = postTopEl;
      if (current) {
        current.scrollIntoView({ behavior, block: "start" });
      }
    },
    [postTopEl]
  );

  useEffect(() => {
    handleScrollTop();
  }, [postIdx, handleScrollTop]);

  useEffect(() => {
    handleFetchPost();
  }, [handleFetchPost]);

  useEffect(() => {
    handleFetchOtherPosts();
  }, [handleFetchOtherPosts]);

  useEffect(() => {
    return () => dispatch(initPost());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error("글 부분에서 오류가 발생했어요!");
      dispatch(initPostError());
    }
  }, [error, dispatch]);

  return {
    admin,
    loading,
    notFound,
    postIdx,
    post,
    otherPosts,
    postTopEl,
    handleScrollTop,
  };
}
