import React, { FC } from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import getDateFormat from "../../../lib/getDateFormat";
import IPost from "../../../types/post.type";

const styles = require("./TempPostItem.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type TempPostItemProps = {
  post: IPost;
  onClick: (idx: number) => void;
};

const TempPostItem: FC<TempPostItemProps> = ({ post, onClick }) => {
  const { idx, title, content, created_at } = post;

  return (
    <div className={cx("temp-post-item")}>
      <div className={cx("temp-post-item-info")}>
        <Link to={`/update/${idx}`} className={cx("temp-post-item-info-wrap")}>
          <h3 className={cx("temp-post-item-info-wrap-title")}>{title}</h3>
          <p className={cx("temp-post-item-info-wrap-content")}>{content}</p>
        </Link>
        <div className={cx("temp-post-item-info-bottom")}>
          <p className={cx("temp-post-item-info-bottom-date")}>{getDateFormat(created_at)}</p>
          <FaTrash onClick={() => onClick(idx)} />
        </div>
      </div>
    </div>
  );
};

export default TempPostItem;
