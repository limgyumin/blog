import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import Categories from "../../components/Categories";
import useStore from "../../util/lib/hooks/useStore";
import {
  CategoriesResponse,
  CategoryPostsResponse,
} from "../../util/types/Response";
import { toast } from "react-toastify";
import ModalContainer from "../Modal/ModalContainer";
import Portal from "../../components/common/Portal";
import CategoryDeleteAlert from "../../components/Categories/CategoryDeleteAlert";
import isEmpty from "../../util/lib/isEmpty";
import removeLastBlank from "../../util/lib/removeLastBlank";

const CategoriesContainer = ({}) => {
  const { store } = useStore();
  const {
    categoryPosts,
    handleCreateCategory,
    handleCategories,
    handleCategoryPosts,
    handleDeleteCategory,
  } = store.CategoryStore;
  const { admin, login } = store.UserStore;

  const [isShow, setIsShow] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryIdx, setCategoryIdx] = useState<number>(0);

  const [createMode, setCreateMode] = useState<boolean>(false);
  const [modifyMode, setModifyMode] = useState<boolean>(false);
  const [deleteMode, setDeleteMode] = useState<boolean>(false);

  const handleCreateCategoryCallback = useCallback(async () => {
    if (admin && login) {
      await handleCreateCategory(removeLastBlank(categoryName))
        .then((res: Response) => {
          handleCategoryPostsCallback();
          handleCategoriesCallback();
          setCreateMode(false);
        })
        .catch((err: Error) => {
          if (err.message.indexOf("409")) {
            toast.error("중복된 카테고리에요.");
          } else {
            toast.error("악! 카테고리 생성에 실패했어요.");
          }
        });
    }
  }, [categoryName]);

  const handleCategoryPostsCallback = useCallback(async () => {
    await handleCategoryPosts()
      .then((res: CategoryPostsResponse) => {})
      .catch((err: Error) => {
        toast.error("이런! 카테고리 조회에 실패했어요.");
      });
  }, []);

  const handleCategoriesCallback = useCallback(async () => {
    await handleCategories()
      .then((res: CategoriesResponse) => {})
      .catch((err: Error) => {
        toast.error("이런! 카테고리 조회에 실패했어요.");
      });
  }, []);

  const handleDeleteCategoryCallback = useCallback(async () => {
    if (admin && login) {
      await handleDeleteCategory(categoryIdx)
        .then(() => {
          handleCategoryPostsCallback();
          handleCategoriesCallback();
        })
        .catch((err: Error) => {
          toast.error("이런! 카테고리 삭제에 실패했어요.");
        });
    }
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

  const keyDownListener = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        !isEmpty(categoryName) &&
        (e.key === "Enter" || e.key === "NumpadEnter")
      ) {
        handleCreateCategoryCallback();
      }
    },
    [categoryName, handleCreateCategoryCallback]
  );

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
        categoryName={categoryName}
        createMode={createMode}
        modifyMode={modifyMode}
        deleteMode={deleteMode}
        setCreateMode={setCreateMode}
        setModifyMode={setModifyMode}
        setDeleteMode={setDeleteMode}
        setCategoryName={setCategoryName}
        deleteCategoryHandler={deleteCategoryHandler}
        keyDownListener={keyDownListener}
      />
    </>
  );
};

export default observer(CategoriesContainer);
