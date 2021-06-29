import { useCallback, useEffect } from "react";
import useQueryString from "hooks/util/useQueryString";
import { RootState } from "modules";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { fetchPostsThunk, PostParamsType } from "modules/common/thunks";
import { POST_LIMIT } from "constants/postLimit";
import { increasePage, initCommonError, resetPage } from "modules/common";
import { useInView } from "react-intersection-observer";
import { toast } from "react-toastify";

export default function useFetchPosts() {
  const { loading, error, data } = useSelector((state: RootState) => state.commons);
  const { page, total, notFound, posts } = data;

  const dispatch = useDispatch();

  const { search } = useLocation();
  const tab = useQueryString("tab");

  const [lastPostEl, inView] = useInView({ threshold: 0.5 });

  const handleFetchPosts = useCallback(() => {
    const params: PostParamsType = {
      page,
      limit: POST_LIMIT,
    };

    if (tab) {
      params.category = Number(tab);
    }

    dispatch(fetchPostsThunk(params));
  }, [page, tab, dispatch]);

  useEffect(() => {
    handleFetchPosts();
  }, [search, handleFetchPosts]);

  useEffect(() => {
    if (inView && !loading && posts.length < total) {
      dispatch(increasePage());
    }
  }, [inView, total, page, loading, posts.length, dispatch]);

  useEffect(() => {
    dispatch(resetPage());
  }, [search, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error("글 목록 부분에서 오류가 발생했어요!");
      dispatch(initCommonError());
    }
  }, [error, dispatch]);

  return {
    posts,
    total,
    notFound,
    loading,
    lastPostEl,
  };
}
