import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React, { FC } from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import getTimeCount from "../../../lib/getTimeCount";

const styles = require("./PostHeader.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type PostHeaderProps = {
  title: string;
  writer: string;
  categoryName: string;
  createdAt: Date;
  thumbnail: string;
  admin: boolean;
  onDelete: () => void;
  onUpdate: () => void;
};

const PostHeader: FC<PostHeaderProps> = ({
  title,
  writer,
  categoryName,
  createdAt,
  thumbnail,
  admin,
  onDelete,
  onUpdate,
}) => {
  return (
    <div className={cx("post-header")}>
      <div className={cx("post-header-wrap")}>
        <h1 className={cx("post-header-wrap-title")}>{title}</h1>
        <div className={cx("post-header-wrap-category")}>
          <div className={cx("post-header-wrap-category-container")}>
            {categoryName && (
              <div className={cx("post-header-wrap-category-container-name")}>{categoryName}</div>
            )}
            <p className={cx("post-header-wrap-category-container-info")}>
              <span>{writer}</span>
              {" · "}
              {getTimeCount(createdAt)}
            </p>
          </div>
          <div className={cx("post-header-wrap-category-right")}>
            {admin && (
              <div className={cx("post-header-wrap-category-right-control")}>
                <FaPen onClick={onUpdate} />
                <FaTrash onClick={onDelete} />
              </div>
            )}
          </div>
        </div>
      </div>
      {thumbnail && <img src={thumbnail} alt={thumbnail} className={cx("post-header-thumbnail")} />}
    </div>
  );
};

export default PostHeader;
