import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import getDateFormat from "../../../lib/getDateFormat";
import IPost from "../../../types/post.type";
import "./SearchPostItem.scss";

const styles = require("./SearchPostItem.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type SearchPostItemProps = {
  post: IPost;
};

const SearchPostItem: FC<SearchPostItemProps> = ({ post }) => {
  const { idx, thumbnail, title, description, category_name, created_at } = post;

  return (
    <Link to={`/post/${idx}`} className={cx("search-post-item")}>
      {thumbnail && (
        <div className={cx("search-post-item-thumbnail")}>
          <img src={thumbnail} alt="Thumbnail" className={cx("search-post-item-thumbnail-image")} />
        </div>
      )}
      <div className={cx("search-post-item-content")}>
        <div className={cx("search-post-item-content-info")}>
          <div className={cx("search-post-item-content-info-title")}>
            <span>{title}</span>
            <p>↗</p>
          </div>
          <span className={cx("search-post-item-content-info-description")}>{description}</span>
        </div>
        <div className={cx("search-post-item-content-wrap")}>
          <span className={cx("search-post-item-content-wrap-category")}>{category_name}</span>
          <span className={cx("search-post-item-content-wrap-date")}>
            {getDateFormat(created_at)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SearchPostItem;
