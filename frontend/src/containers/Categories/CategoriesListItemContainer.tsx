import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { CategoryPostsType } from "../../util/types/Category";
import CategoriesListItem from "../../components/Categories/CategoriesListItem";
import useStore from "../../util/lib/hooks/useStore";
import { toast } from "react-toastify";
import Portal from "../../components/common/Portal";
import ModalContainer from "../Modal/ModalContainer";
import CategoryDeleteAlert from "../../components/Categories/CategoryDeleteAlert";
import removeLastBlank from "../../util/lib/removeLastBlank";
import isEmpty from "../../util/lib/isEmpty";

interface CategoriesListItemContainerProps {
  handleCategoryPostsCallback: () => Promise<void>;
  handleCategoriesCallback: () => Promise<void>;
  categoryPost: CategoryPostsType;
  editMode: boolean;
}

const CategoriesListItemContainer = ({
  handleCategoryPostsCallback,
  handleCategoriesCallback,
  categoryPost,
  editMode,
}: CategoriesListItemContainerProps) => {
  const { store } = useStore();
  const { handleModifyCategory, handleDeleteCategory } = store.CategoryStore;
  const { admin, login } = store.UserStore;

  const [isShow, setIsShow] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [modifyMode, setModifyMode] = useState<boolean>(false);

  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryIdx, setCategoryIdx] = useState<number>(0);

  const handleModifyCategoryCallback = useCallback(async () => {
    if (admin && login) {
      await handleModifyCategory(categoryIdx, removeLastBlank(categoryName))
        .then((res: Response) => {
          handleCategoryPostsCallback();
          handleCategoriesCallback();
          setModifyMode((prev) => !prev);
        })
        .catch((err: Error) => {
          toast.error("이런! 카테고리 수정에 실패했어요.");
        });
    }
  }, [categoryIdx, categoryName]);

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

  const deleteClickHandler = useCallback(() => {
    handleDeleteCategoryCallback();
    showModalCallback();
  }, [handleDeleteCategoryCallback]);

  const modifyCategoryHandler = (idx: number) => {
    setModifyMode((prev) => !prev);
    setCategoryName(categoryPost.name);
    setCategoryIdx(idx);
  };

  const deleteCategoryHandler = (idx: number) => {
    showModalCallback();
    setCategoryIdx(idx);
  };

  const keyDownListener = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === "NumpadEnter") {
        if (isEmpty(categoryName)) {
          toast.error("이름을 작성해주세요.");
          return;
        }
        handleModifyCategoryCallback();
      }
    },
    [categoryName, handleModifyCategoryCallback]
  );

  useEffect(() => {
    if (!editMode) {
      setModifyMode(false);
    }
  }, [editMode]);

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
      <CategoriesListItem
        categoryPost={categoryPost}
        editMode={editMode}
        modifyCategoryHandler={modifyCategoryHandler}
        deleteCategoryHandler={deleteCategoryHandler}
        modifyMode={modifyMode}
        setModifyMode={setModifyMode}
        keyDownListener={keyDownListener}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
      />
    </>
  );
};

export default observer(CategoriesListItemContainer);
