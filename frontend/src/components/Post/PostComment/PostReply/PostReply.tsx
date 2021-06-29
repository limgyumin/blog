import React from "react";
import { BiMessageSquareAdd, BiMessageSquareMinus } from "react-icons/bi";
import PostReplyHandle from "./PostReplyHandle";
import Modal from "components/common/Modal";
import { FC } from "react";
import useReply from "hooks/reply/useReply";
import PostReplyDelete from "./PostReplyDelete";
import { ClassNamesFn } from "classnames/types";
import classNames from "classnames";
import PostReplyItem from "./PostReplyItem";
import useCreateReply from "hooks/reply/useCreateReply";
import IReply from "types/reply.type";

const styles = require("./PostReply.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type PostReplyProps = {
  commentIdx: number;
  replyCount: number;
  replies: IReply[];
};

const PostReply: FC<PostReplyProps> = ({ commentIdx, replyCount, replies }) => {
  const {
    content,
    replyLastEl,
    handleCreateReply,
    handleChangeContent,
    handleKeyDownContent,
  } = useCreateReply(commentIdx);
  const {
    isMount,
    showReplies,
    handleModalMount,
    handleShowReplies,
    handleClickDeleteReply,
    handleDeleteReply,
  } = useReply();

  return (
    <React.Fragment>
      <Modal isMount={isMount}>
        <PostReplyDelete onDelete={handleDeleteReply} onCancel={handleModalMount} />
      </Modal>
      <div className={cx("post-reply")}>
        <div className={cx("post-reply-preview")}>
          {showReplies ? (
            <div className={cx("post-reply-preview-hide")} onClick={handleShowReplies}>
              <BiMessageSquareMinus />
              <span>Hide</span>
            </div>
          ) : (
            <React.Fragment>
              {replyCount ? (
                <div className={cx("post-reply-preview-count")} onClick={handleShowReplies}>
                  <BiMessageSquareAdd />
                  <span>
                    {replyCount} {replyCount > 1 ? "Replies" : "Reply"}
                  </span>
                </div>
              ) : (
                <div className={cx("post-reply-preview-leave")} onClick={handleShowReplies}>
                  <BiMessageSquareAdd />
                  <span>Leave a reply</span>
                </div>
              )}
            </React.Fragment>
          )}
        </div>
        {showReplies && (
          <div className={cx("post-reply-list")} ref={replyLastEl}>
            {replies.map((reply) => (
              <PostReplyItem key={reply.idx} reply={reply} onClick={handleClickDeleteReply} />
            ))}
            <PostReplyHandle
              content={content}
              onChange={handleChangeContent}
              onKeyDown={handleKeyDownContent}
              onComplete={handleCreateReply}
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default PostReply;
