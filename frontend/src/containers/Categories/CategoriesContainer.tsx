import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import Categories from "../../components/Categories";
import useStore from "../../util/lib/hooks/useStore";
import { CategoryPostsResponse } from "../../util/types/Response";
import { toast } from "react-toastify";
import ModalContainer from "../Modal/ModalContainer";
import Portal from "../../components/common/Portal";
import CategoryDeleteAlert from "../../components/Categories/CategoryDeleteAlert";

const CategoriesContainer = ({}) => {
  const { store } = useStore();
  const {
    categoryPosts,
    handleCategoryPosts,
    handleDeleteCategory,
  } = store.CategoryStore;
  const { admin, login } = store.UserStore;

  const [categoryIdx, setCategoryIdx] = useState<number>(0);
  const [modifyMode, setModifyMode] = useState<boolean>(false);
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCategoryPostsCallback = useCallback(async () => {
    await handleCategoryPosts()
      .then((res: CategoryPostsResponse) => {})
      .catch((err: Error) => {
        toast.error("이런! 카테고리 조회에 실패했어요.");
      });
  }, []);

  const handleDeleteCategoryCallback = useCallback(async () => {
    await handleDeleteCategory(categoryIdx)
      .then(() => {
        handleCategoryPostsCallback();
      })
      .catch((err: Error) => {
        toast.error("이런! 카테고리 삭제에 실패했어요.");
      });
  }, [categoryIdx]);

  const showModalCallback = useCallback(() => {
    if (isShow) {
      setTimeout(() => {
        setIsShow(!isShow);
      }, 500);
    } else {
      setIsShow(!isShow);
    }
    setIsOpen(!isOpen);
  }, [isShow, isOpen]);

  const deleteCategoryHandler = (idx: number) => {
    showModalCallback();
    setCategoryIdx(idx);
  };

  const deleteClickHandler = useCallback(() => {
    handleDeleteCategoryCallback();
    showModalCallback();
  }, [handleDeleteCategoryCallback]);

  useEffect(() => {
    handleCategoryPostsCallback();
  }, [handleCategoryPostsCallback]);

  return (
    <>
      <Portal elementId="modal-root">
        <ModalContainer isOpen={isOpen} isShow={isShow}>
          <CategoryDeleteAlert
            deleteClickHandler={deleteClickHandler}
            showModalCallback={showModalCallback}
          />
        </ModalContainer>
      </Portal>
      <Categories
        categoryPosts={categoryPosts}
        admin={admin}
        login={login}
        deleteMode={deleteMode}
        setDeleteMode={setDeleteMode}
        deleteCategoryHandler={deleteCategoryHandler}
      />
    </>
  );
};

export default observer(CategoriesContainer);
