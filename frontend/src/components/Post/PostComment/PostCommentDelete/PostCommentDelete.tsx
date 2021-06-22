import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React, { FC } from "react";
import "./PostCommentDelete.scss";

const styles = require("./PostCommentDelete.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type PostCommentDeleteProps = {
  onDelete: () => void;
  onCancel: () => void;
};

const PostCommentDelete: FC<PostCommentDeleteProps> = ({ onDelete, onCancel }) => {
  return (
    <div className={cx("post-comment-delete")}>
      <div className={cx("post-comment-delete-content")}>
        <h2>댓글 삭제</h2>
        <p>정말로 댓글을 삭제하시겠어요?</p>
      </div>
      <div className={cx("post-comment-delete-button")}>
        <button className={cx("post-comment-delete-button-delete")} onClick={onDelete}>
          삭제
        </button>
        <button className={cx("post-comment-delete-button-cancel")} onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

export default PostCommentDelete;
