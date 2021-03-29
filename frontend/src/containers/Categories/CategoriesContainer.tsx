import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import Categories from "../../components/Categories";
import useStore from "../../util/lib/hooks/useStore";
import {
  CategoriesResponse,
  CategoryPostsResponse,
} from "../../util/types/Response";
import { toast } from "react-toastify";
import isEmpty from "../../util/lib/isEmpty";
import removeLastBlank from "../../util/lib/removeLastBlank";
import ReactHelmet from "../../components/common/ReactHelmet";
import { THUMBNAIL_URL } from "../../config/config.json";

const CategoriesContainer = ({}) => {
  const { store } = useStore();
  const {
    categoryPosts,
    handleCreateCategory,
    handleCategories,
    handleCategoryPosts,
  } = store.CategoryStore;
  const { admin, login } = store.UserStore;

  const [categoryName, setCategoryName] = useState<string>("");

  const [createMode, setCreateMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleCreateCategoryCallback = useCallback(async () => {
    if (admin && login) {
      await handleCreateCategory(removeLastBlank(categoryName))
        .then((res: Response) => {
          handleCategoryPostsCallback();
          handleCategoriesCallback();
          setCreateMode(false);
          setCategoryName("");
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

  const keyDownListener = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === "NumpadEnter") {
        if (isEmpty(categoryName)) {
          toast.error("이름을 작성해주세요.");
          return;
        }
        handleCreateCategoryCallback();
      }
    },
    [categoryName, handleCreateCategoryCallback]
  );

  useEffect(() => {
    handleCategoryPostsCallback();
  }, [handleCategoryPostsCallback]);

  return (
    <>
      <ReactHelmet
        title="Categories | Nonamed"
        description="개발자를 꿈꾸는 한 학생의 이야기"
        url="https://nonamed.blog/categories"
        image={THUMBNAIL_URL}
      />
      <Categories
        categoryPosts={categoryPosts}
        admin={admin}
        login={login}
        categoryName={categoryName}
        createMode={createMode}
        editMode={editMode}
        setCreateMode={setCreateMode}
        setEditMode={setEditMode}
        setCategoryName={setCategoryName}
        keyDownListener={keyDownListener}
        handleCategoryPostsCallback={handleCategoryPostsCallback}
        handleCategoriesCallback={handleCategoriesCallback}
      />
    </>
  );
};

export default observer(CategoriesContainer);
