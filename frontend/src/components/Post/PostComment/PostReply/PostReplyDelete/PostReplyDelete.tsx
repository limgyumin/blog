import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React, { FC } from "react";

const styles = require("./PostReplyDelete.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type PostReplyDeleteProps = {
  onDelete: () => void;
  onCancel: () => void;
};

const PostReplyDelete: FC<PostReplyDeleteProps> = ({ onDelete, onCancel }) => {
  return (
    <div className={cx("post-reply-delete")}>
      <div className={cx("post-reply-delete-content")}>
        <h2>답글 삭제</h2>
        <p>정말로 답글을 삭제하시겠어요?</p>
      </div>
      <div className={cx("post-reply-delete-button")}>
        <button className={cx("post-reply-delete-button-delete")} onClick={onDelete}>
          삭제
        </button>
        <button className={cx("post-reply-delete-button-cancel")} onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

export default PostReplyDelete;
