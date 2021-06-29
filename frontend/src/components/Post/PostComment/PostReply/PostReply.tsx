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
    createReplyHandler,
    onChangeContent,
    onKeyDownContent,
  } = useCreateReply(commentIdx);
  const {
    isMount,
    showReplies,
    onMount,
    onShowReplies,
    onDeleteHandler,
    deleteReplyHandler,
  } = useReply();

  return (
    <React.Fragment>
      <Modal isMount={isMount}>
        <PostReplyDelete onDelete={deleteReplyHandler} onCancel={onMount} />
      </Modal>
      <div className={cx("post-reply")}>
        <div className={cx("post-reply-preview")}>
          {showReplies ? (
            <div className={cx("post-reply-preview-hide")} onClick={onShowReplies}>
              <BiMessageSquareMinus />
              <span>Hide</span>
            </div>
          ) : (
            <React.Fragment>
              {replyCount ? (
                <div className={cx("post-reply-preview-count")} onClick={onShowReplies}>
                  <BiMessageSquareAdd />
                  <span>
                    {replyCount} {replyCount > 1 ? "Replies" : "Reply"}
                  </span>
                </div>
              ) : (
                <div className={cx("post-reply-preview-leave")} onClick={onShowReplies}>
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
              <PostReplyItem key={reply.idx} reply={reply} onDeleteHandler={onDeleteHandler} />
            ))}
            <PostReplyHandle
              content={content}
              onChange={onChangeContent}
              onKeyDown={onKeyDownContent}
              onComplete={createReplyHandler}
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default PostReply;
