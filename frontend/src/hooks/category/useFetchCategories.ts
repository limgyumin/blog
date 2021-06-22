import { RootState } from "modules";
import { fetchCategoriesThunk, initCategoryError } from "modules/category";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function useFetchCategories() {
  const { loading, error, data } = useSelector((state: RootState) => state.categories);
  const { categories, totalPostCount } = data;

  const dispatch = useDispatch();

  const fetchCategoriesHandler = useCallback(() => {
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    fetchCategoriesHandler();
  }, [fetchCategoriesHandler]);

  useEffect(() => {
    if (error) {
      toast.error("카테고리 부분에서 오류가 발생했어요!");
      dispatch(initCategoryError());
    }
  }, [error, dispatch]);

  return {
    loading,
    categories,
    totalPostCount,
  };
}
