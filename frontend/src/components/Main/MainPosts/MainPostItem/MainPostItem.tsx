import React, { FC } from "react";
import { RiChat3Line } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import IPost from "types/post.type";
import { Link } from "react-router-dom";
import getDateFormat from "lib/getDateFormat";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./MainPostItem.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type MainPostItemProps = {
  post: IPost;
  lastPostEl?: (node?: Element | null | undefined) => void;
};

const MainPostItem: FC<MainPostItemProps> = ({ post, lastPostEl }) => {
  const {
    idx,
    thumbnail,
    title,
    description,
    comment_count,
    like_count,
    category_name,
    created_at,
  } = post;

  return (
    <Link to={`/post/${idx}`} className={cx("main-post-item")} ref={lastPostEl}>
      {thumbnail && (
        <div className={cx("main-post-item-thumbnail")}>
          <div className={cx("main-post-item-thumbnail-shadow")}>
            <div className={cx("main-post-item-thumbnail-shadow-wrap")}>
              <div className={cx("main-post-item-thumbnail-shadow-wrap-comment")}>
                <RiChat3Line />
                <p>{comment_count}</p>
              </div>
              <div className={cx("main-post-item-thumbnail-shadow-wrap-like")}>
                <AiOutlineHeart />
                <p>{like_count}</p>
              </div>
            </div>
          </div>
          <img src={thumbnail} alt={thumbnail} className={cx("main-post-item-thumbnail-image")} />
        </div>
      )}
      <div className={cx("main-post-item-content")}>
        <div className={cx("main-post-item-content-wrap")}>
          <span className={cx("main-post-item-content-wrap-category")}>{category_name}</span>
          <span className={cx("main-post-item-content-wrap-date")}>
            {getDateFormat(created_at)}
          </span>
        </div>
        <div className={cx("main-post-item-content-info")}>
          <div className={cx("main-post-item-content-info-title")}>
            <span>{title}</span>
            <p>↗</p>
          </div>
          <span className={cx("main-post-item-content-info-description")}>{description}</span>
        </div>
      </div>
    </Link>
  );
};

export default MainPostItem;
