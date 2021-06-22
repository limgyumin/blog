import React, { FC } from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { FaFolder } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IPostShortInfo } from "types/category.type";
import getDateFormat from "../../../lib/getDateFormat";

const styles = require("./CategoryPostItem.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type CategoryPostItemProps = {
  post: IPostShortInfo;
};

const CategoryPostItem: FC<CategoryPostItemProps> = ({ post }) => {
  return (
    <Link to={`/post/${post.idx}`} className={cx("category-post-item")}>
      <div className={cx("category-post-item-info")}>
        <div className={cx("category-post-item-info-wrap")}>
          <FaFolder />
          <p className={cx("category-post-item-info-wrap-name")}>{post.title}</p>
        </div>
        <p className={cx("category-post-item-info-date")}>{getDateFormat(post.created_at)}</p>
      </div>
    </Link>
  );
};

export default CategoryPostItem;
