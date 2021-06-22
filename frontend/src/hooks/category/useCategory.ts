import React from "react";
import { useCallback, useState } from "react";
import isEmpty from "lib/isEmpty";
import { RootState } from "modules";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createCategoryThunk, deleteCategoryThunk, updateCategoryThunk } from "modules/category";
import removeBlank from "lib/removeLastBlank";
import { ICategoryPosts } from "types/category.type";
import useModal from "hooks/util/useModal";

export default function useCategory(categoryPost?: ICategoryPosts) {
  const { data } = useSelector((state: RootState) => state.categories);
  const { categoryPosts } = data;
  const { login, admin } = useSelector((state: RootState) => state.users.data);
  const dispatch = useDispatch();

  const { isMount, onMount } = useModal();

  const [categoryName, setCategoryName] = useState<string>("");
  const [createMode, setCreateMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [categoryIdx, setCategoryIdx] = useState<number>(0);

  const createCategoryHandler = useCallback(() => {
    if (!login || !admin) return;

    dispatch(createCategoryThunk(removeBlank(categoryName)));
    setCreateMode(false);
    setCategoryName("");
  }, [login, admin, categoryName, dispatch, setCreateMode, setCategoryName]);

  const updateCategoryHandler = useCallback(() => {
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

  const deleteCategoryHandler = useCallback(() => {
    if (!login || !admin) return;

    if (categoryPosts.length <= 1) {
      toast.warn("카테고리는 최소 1개가 있어야해요.");
      return;
    }

    dispatch(deleteCategoryThunk(categoryIdx));
    setCategoryIdx(0);
  }, [login, admin, categoryPosts, categoryIdx, dispatch, setCategoryIdx]);

  const createModeHandler = useCallback(() => {
    setCreateMode((prev) => !prev);
  }, [setCreateMode]);

  const editModeHandler = useCallback(() => {
    setEditMode((prev) => !prev);
  }, [setEditMode]);

  const onUpdateHandler = useCallback(
    (idx: number) => {
      setUpdateMode(true);
      setCategoryName(categoryPost.name);
      setCategoryIdx(idx);
    },
    [categoryPost, setUpdateMode, setCategoryName, setCategoryIdx]
  );

  const onDeleteConfirmHandler = useCallback(() => {
    deleteCategoryHandler();
    onMount();
  }, [deleteCategoryHandler, onMount]);

  const onDeleteHandler = useCallback(
    (idx: number) => {
      onMount();
      setCategoryIdx(idx);
    },
    [onMount]
  );

  const onCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCategoryName(e.target.value);
    },
    [setCategoryName]
  );

  const onCreateCategoryKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === "NumpadEnter") {
        if (isEmpty(categoryName)) {
          toast.error("이름을 작성해주세요.");
          return;
        }
        createCategoryHandler();
      }
    },
    [categoryName, createCategoryHandler]
  );

  const onUpdateCategoryKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === "NumpadEnter") {
        if (isEmpty(categoryName)) {
          toast.error("이름을 작성해주세요.");
          return;
        }
        updateCategoryHandler();
      }
    },
    [categoryName, updateCategoryHandler]
  );

  return {
    admin,
    login,
    categoryName,
    createMode,
    editMode,
    updateMode,
    isMount,
    onMount,
    onCategoryChange,
    onCreateCategoryKeyDown,
    onUpdateCategoryKeyDown,
    createModeHandler,
    editModeHandler,
    onUpdateHandler,
    onDeleteHandler,
    onDeleteConfirmHandler,
    createCategoryHandler,
    updateCategoryHandler,
    deleteCategoryHandler,
  };
}
