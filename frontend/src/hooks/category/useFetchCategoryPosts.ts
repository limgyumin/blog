import { useCallback, useEffect } from "react";
import { RootState } from "modules";
import { fetchCategoryPostsThunk } from "modules/category";
import { useDispatch, useSelector } from "react-redux";

export default function useFetchCategoryPosts() {
  const { loading, data } = useSelector((state: RootState) => state.categories);
  const { categoryPosts } = data;

  const dispatch = useDispatch();

  const handleFetchCategoryPosts = useCallback(() => {
    dispatch(fetchCategoryPostsThunk());
  }, [dispatch]);

  useEffect(() => {
    handleFetchCategoryPosts();
  }, [handleFetchCategoryPosts]);

  return {
    loading,
    categoryPosts,
  };
}
