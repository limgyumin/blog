import React from "react";
import { BiMessageSquareAdd, BiMessageSquareMinus } from "react-icons/bi";
import PostReplyHandle from "./PostReplyHandle";
import Modal from "components/common/Modal";
import { FC } from "react";
import useReply from "hooks/reply/useReply";
import PostReplyDelete from "./PostReplyDelete";
import useFetchReplies from "hooks/reply/useFetchReplies";
import { ClassNamesFn } from "classnames/types";
import classNames from "classnames";
import PostReplyItem from "./PostReplyItem";
import useCreateReply from "hooks/reply/useCreateReply";
import PostReplyLoading from "./PostReplyLoading";

const styles = require("./PostReply.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type PostReplyProps = {
  commentIdx: number;
};

const PostReply: FC<PostReplyProps> = ({ commentIdx }) => {
  const {
    loading,
    replies,
    replyCount,
    showReplies,
    onShowRepliesHandler,
    fetchRepliesHandler,
  } = useFetchReplies(commentIdx);
  const {
    content,
    replyLastEl,
    createReplyHandler,
    onChangeContent,
    onKeyDownContent,
  } = useCreateReply(fetchRepliesHandler, commentIdx);
  const { isMount, onMount, onDeleteHandler, deleteReplyHandler } = useReply(fetchRepliesHandler);

  return (
    <React.Fragment>
      <Modal isMount={isMount}>
        <PostReplyDelete onDelete={deleteReplyHandler} onCancel={onMount} />
      </Modal>
      <div className={cx("post-reply")}>
        <div className={cx("post-reply-preview")}>
          {showReplies ? (
            <div className={cx("post-reply-preview-hide")} onClick={onShowRepliesHandler}>
              <BiMessageSquareMinus />
              <span>Hide</span>
            </div>
          ) : (
            <React.Fragment>
              {replyCount ? (
                <div className={cx("post-reply-preview-count")} onClick={onShowRepliesHandler}>
                  <BiMessageSquareAdd />
                  <span>
                    {replyCount} {replyCount > 1 ? "Replies" : "Reply"}
                  </span>
                </div>
              ) : (
                <div className={cx("post-reply-preview-leave")} onClick={onShowRepliesHandler}>
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
              <PostReplyItem
                key={reply.idx}
                reply={reply}
                onDeleteHandler={onDeleteHandler}
                fetchRepliesHandler={fetchRepliesHandler}
              />
            ))}
            {loading && <PostReplyLoading />}
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
