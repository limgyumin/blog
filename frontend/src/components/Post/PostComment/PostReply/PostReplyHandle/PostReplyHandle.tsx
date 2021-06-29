import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import useReplyTextArea from "hooks/reply/useReplyTextArea";
import React, { FC } from "react";

const styles = require("./PostReplyHandle.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type PostReplyHandleProps = {
  content: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onComplete: () => void;
  onCancel?: () => void;
};

const PostReplyHandle: FC<PostReplyHandleProps> = ({
  content,
  onChange,
  onKeyDown,
  onComplete,
  onCancel,
}) => {
  const { replyTextAreaEl } = useReplyTextArea(content);

  return (
    <div className={cx("post-reply-handle")}>
      <textarea
        ref={replyTextAreaEl}
        value={content}
        onChange={(e) => onChange(e)}
        onKeyDown={(e) => onKeyDown(e)}
        placeholder="Write a reply ..."
        className={cx("post-reply-handle-box")}
      />
      <div className={cx("post-reply-handle-wrap")}>
        <button className={cx("post-reply-handle-wrap-button")} onClick={onComplete}>
          Send
        </button>
        {onCancel && (
          <button className={cx("post-reply-handle-wrap-cancel")} onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default PostReplyHandle;
