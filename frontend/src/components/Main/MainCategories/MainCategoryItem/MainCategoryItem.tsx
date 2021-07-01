import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ICategory } from "types/category.type";
import useQueryString from "../../../../hooks/util/useQueryString";

const styles = require("./MainCategoryItem.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type MainCategoryItemProps = {
  category: ICategory;
};

const MainCategoryItem: FC<MainCategoryItemProps> = ({ category }) => {
  const tab = useQueryString("tab");

  const { idx, name, post_count } = category;

  const path = `?tab=${idx}`;
  const isTotal = idx === 0;
  const isMain = tab === null;
  const isMatch = Number(tab) === idx;

  return (
    <React.Fragment>
      {isTotal ? (
        <Link to="/" className={cx("main-category-item", { "category-active": isMain })}>
          <div className={cx("main-category-item-wrap")}>
            <p className={cx("main-category-item-wrap-name", { "category-name-active": isMain })}>
              {name}
            </p>
          </div>
          <div className={cx("main-category-item-count", { "category-count-active": isMatch })}>
            {post_count}
          </div>
        </Link>
      ) : (
        <Link to={path} className={cx("main-category-item", { "category-active": isMatch })}>
          <div className={cx("main-category-item-wrap")}>
            <p className={cx("main-category-item-wrap-name", { "category-name-active": isMatch })}>
              {name}
            </p>
          </div>
          <div className={cx("main-category-item-count", { "category-count-active": isMatch })}>
            {post_count}
          </div>
        </Link>
      )}
    </React.Fragment>
  );
};

export default MainCategoryItem;
