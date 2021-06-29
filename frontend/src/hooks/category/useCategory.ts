import React, { useEffect } from "react";
import { useCallback, useState } from "react";
import isEmpty from "lib/isEmpty";
import { RootState } from "modules";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createCategoryThunk, deleteCategoryThunk, updateCategoryThunk } from "modules/category";
import removeBlank from "lib/removeLastBlank";
import { ICategoryPosts } from "types/category.type";
import useModal from "hooks/common/useModal";

export default function useCategory(categoryPost?: ICategoryPosts) {
  const { data } = useSelector((state: RootState) => state.categories);
  const { categoryPosts } = data;
  const { login, admin } = useSelector((state: RootState) => state.users.data);
  const dispatch = useDispatch();

  const { isMount, handleModalMount } = useModal();

  const [categoryName, setCategoryName] = useState<string>("");
  const [createMode, setCreateMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [categoryIdx, setCategoryIdx] = useState<number>(0);

  const handleCreateCategory = useCallback(() => {
    if (!login || !admin) return;

    dispatch(createCategoryThunk(removeBlank(categoryName)));
    setCreateMode(false);
    setCategoryName("");
  }, [login, admin, categoryName, dispatch]);

  const handleUpdateCategory = useCallback(() => {
    if (!login || !admin) return;

    if (categoryName === categoryPost.name) {
      setEditMode(false);
      return;
    }

    dispatch(updateCategoryThunk(categoryIdx, removeBlank(categoryName)));
    setEditMode(false);
    setCategoryName("");
    setCategoryIdx(0);
  }, [login, admin, categoryIdx, categoryName, categoryPost, dispatch]);

  const handleDeleteCategory = useCallback(() => {
    if (!login || !admin) return;

    if (categoryPosts.length <= 1) {
      toast.warn("카테고리는 최소 1개가 있어야해요.");
      return;
    }

    dispatch(deleteCategoryThunk(categoryIdx));
    setCategoryIdx(0);
  }, [login, admin, categoryPosts, categoryIdx, dispatch]);

  const handleCreateMode = useCallback(() => {
    setCreateMode((prev) => !prev);
  }, []);

  const handleEditMode = useCallback(() => {
    setEditMode((prev) => !prev);
  }, []);

  const handleClickUpdateCategory = useCallback(
    (idx: number) => {
      setUpdateMode(true);
      setCategoryName(categoryPost.name);
      setCategoryIdx(idx);
    },
    [categoryPost]
  );

  const handleConfirmDeleteCategory = useCallback(() => {
    handleDeleteCategory();
    handleModalMount();
  }, [handleDeleteCategory, handleModalMount]);

  const handleClickDeleteCategory = useCallback(
    (idx: number) => {
      handleModalMount();
      setCategoryIdx(idx);
    },
    [handleModalMount]
  );

  const handleChangeCategory = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  }, []);

  const handleKeyDownCreateCategory = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === "NumpadEnter") {
        if (isEmpty(categoryName)) {
          toast.error("이름을 작성해주세요.");
          return;
        }
        handleCreateCategory();
      }
    },
    [categoryName, handleCreateCategory]
  );

  const handleKeyDownUpdateCategory = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === "NumpadEnter") {
        if (isEmpty(categoryName)) {
          toast.error("이름을 작성해주세요.");
          return;
        }
        handleUpdateCategory();
      }
    },
    [categoryName, handleUpdateCategory]
  );

  useEffect(() => {
    return () => {
      setCategoryName("");
      setCategoryIdx(0);
      setCreateMode(false);
      setEditMode(false);
      setUpdateMode(false);
    };
  }, []);

  return {
    admin,
    login,
    categoryName,
    createMode,
    editMode,
    updateMode,
    isMount,
    handleModalMount,
    handleChangeCategory,
    handleKeyDownCreateCategory,
    handleKeyDownUpdateCategory,
    handleCreateMode,
    handleEditMode,
    handleClickUpdateCategory,
    handleClickDeleteCategory,
    handleConfirmDeleteCategory,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
  };
}
