import React, { FC } from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./PostDelete.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type PostDeleteProps = {
  onDelete: () => void;
  onCancel: () => void;
};

const PostDelete: FC<PostDeleteProps> = ({ onDelete, onCancel }) => {
  return (
    <div className={cx("post-delete")}>
      <div className={cx("post-delete-content")}>
        <h2>게시글 삭제</h2>
        <p>정말로 게시글을 삭제하시겠어요?</p>
      </div>
      <div className={cx("post-delete-button")}>
        <button className={cx("post-delete-button-delete")} onClick={onDelete}>
          삭제
        </button>
        <button className={cx("post-delete-button-cancel")} onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

export default PostDelete;
