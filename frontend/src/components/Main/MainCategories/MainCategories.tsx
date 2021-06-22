import React, { FC } from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { Link } from "react-router-dom";
import { ICategory } from "types/category.type";
import MainCategoryItem from "./MainCategoryItem";

type MainCategoriesProps = {
  categories: ICategory[];
  totalView: ICategory;
};

const styles = require("./MainCategories.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const MainCategories: FC<MainCategoriesProps> = ({ categories, totalView }) => {
  const CATEGORY_MAX_COUNT = 15;
  return (
    <div className={cx("main-categories")}>
      <div className={cx("main-categories-wrap")}>
        <p className={cx("main-categories-wrap-title")}>Categories</p>
        <div className={cx("main-categories-wrap-list")}>
          <MainCategoryItem category={totalView} />
          {categories.map((category, idx) => (
            <React.Fragment key={idx}>
              {idx < CATEGORY_MAX_COUNT && <MainCategoryItem category={category} />}
            </React.Fragment>
          ))}
          {categories.length > CATEGORY_MAX_COUNT && (
            <Link to="/categories" className={cx("main-categories-wrap-list-all")}>
              <p className={cx("main-categories-wrap-list-all-text")}>... See all Categories</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainCategories;
