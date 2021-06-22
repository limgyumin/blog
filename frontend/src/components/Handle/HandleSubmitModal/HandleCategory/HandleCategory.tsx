import React, { FC } from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { BiBook } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import useFetchCategories from "hooks/category/useFetchCategories";
import usePostCategory from "hooks/post/usePostCategory";
import HandleCategoryList from "components/Handle/HandleCategoryList";

const styles = require("./HandleCategory.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HandleCategoryProps = {
  onChangeRequest: (name: string, value: any) => void;
};

const HandleCategory: FC<HandleCategoryProps> = ({ onChangeRequest }) => {
  const { categories } = useFetchCategories();
  const {
    categoriesEl,
    clickEl,
    showCategories,
    selectedCategory,
    onChangeCategory,
    showCategoriesHandler,
  } = usePostCategory(onChangeRequest);

  return (
    <div className={cx("handle-category")}>
      <p className={cx("handle-category-name")}>카테고리</p>
      <div
        className={cx("handle-category-selectbox")}
        ref={clickEl}
        onClick={showCategoriesHandler}
      >
        <div className={cx("handle-category-selectbox-wrap")}>
          <BiBook className={cx("handle-category-selectbox-wrap-icon")} />
          <p className={cx("handle-category-selectbox-wrap-current")}>
            {selectedCategory || "카테고리 선택"}
          </p>
        </div>
        <IoMdArrowDropdown className={cx("handle-category-selectbox-arrow")} />
      </div>
      {showCategories && (
        <HandleCategoryList
          categoriesEl={categoriesEl}
          categories={categories}
          onChangeCategory={onChangeCategory}
        />
      )}
    </div>
  );
};

export default HandleCategory;
