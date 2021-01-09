import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react";
import Categories from "../../components/Categories";
import useStore from "../../util/lib/hooks/useStore";
import { CategoryPostsResponse } from "../../util/types/Response";
import { toast } from "react-toastify";

const CategoriesContainer = ({}) => {
  const { store } = useStore();
  const { categoryPosts, handleCategoryPosts } = store.CategoryStore;
  const { admin, login } = store.UserStore;

  const handleCategoryPostsCallback = useCallback(async () => {
    await handleCategoryPosts()
      .then((res: CategoryPostsResponse) => {})
      .catch((err: Error) => {
        toast.error("이런! 카테고리 조회에 실패했어요.");
      });
  }, []);

  useEffect(() => {
    handleCategoryPostsCallback();
  }, [handleCategoryPostsCallback]);

  return (
    <>
      <Categories categoryPosts={categoryPosts} admin={admin} login={login} />
    </>
  );
};

export default observer(CategoriesContainer);
