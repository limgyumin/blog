import { useCallback, useEffect, useRef, useState } from "react";
import useClose from "hooks/util/useClose";
import { ICategory } from "types/category.type";
import { useSelector } from "react-redux";
import { RootState } from "modules";
import usePostIdx from "hooks/util/usePostIdx";

export default function usePostCategory(onChangeRequest: (name: string, value: any) => void) {
  const { post } = useSelector((state: RootState) => state.posts.data);

  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const postIdx = usePostIdx();

  const categoriesEl = useRef<HTMLDivElement>(null);
  const clickEl = useRef<HTMLDivElement>(null);

  const handleChangeCategory = useCallback(
    ({ idx, name }: ICategory) => {
      setSelectedCategory(name);
      setShowCategories(false);
      onChangeRequest("category_idx", idx);
    },
    [onChangeRequest]
  );

  const handleShowCategories = useCallback(() => {
    setShowCategories(!showCategories);
  }, [showCategories]);

  useClose<HTMLDivElement>(categoriesEl, clickEl, handleShowCategories);

  useEffect(() => {
    if (postIdx) {
      setSelectedCategory(post.category_name);
    }
  }, [post, postIdx]);

  useEffect(() => {
    return () => {
      setShowCategories(false);
      setSelectedCategory("");
    };
  }, []);

  return {
    categoriesEl,
    clickEl,
    showCategories,
    selectedCategory,
    handleChangeCategory,
    handleShowCategories,
  };
}
