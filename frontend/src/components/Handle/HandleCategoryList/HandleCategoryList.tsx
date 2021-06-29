import React, { FC } from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { ICategory } from "types/category.type";

const styles = require("./HandleCategoryList.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HandleCategoryListProps = {
  categoriesEl: React.MutableRefObject<HTMLDivElement>;
  categories: ICategory[];
  onChange: (category: ICategory) => void;
};

const HandleCategoryList: FC<HandleCategoryListProps> = ({
  categoriesEl,
  categories,
  onChange,
}) => {
  return (
    <div className={cx("handle-category-list")} ref={categoriesEl}>
      {categories.map((category) => (
        <div
          key={category.idx}
          className={cx("handle-category-list-item")}
          onClick={() => onChange(category)}
        >
          <span className={cx("handle-category-list-item-name")}>{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default HandleCategoryList;
