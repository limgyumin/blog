import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import useReply from "hooks/reply/useReply";
import React, { FC } from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import getTimeCount from "../../../../../lib/getTimeCount";
import IReply from "../../../../../types/reply.type";
import PostReplyHandle from "../PostReplyHandle";

const styles = require("./PostReplyItem.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type PostReplyItemProps = {
  reply: IReply;
  onDeleteHandler: (idx: number) => void;
};

const PostReplyItem: FC<PostReplyItemProps> = ({ reply, onDeleteHandler }) => {
  const {
    login,
    profile,
    content,
    updateMode,
    onChangeContent,
    onKeyDownContent,
    onUpdateHandler,
    onCancelUpdateHandler,
    updateReplyHandler,
  } = useReply(reply);

  return (
    <div className={cx("post-reply-item")}>
      <div className={cx("post-reply-item-wrap")}>
        <div className={cx("post-reply-item-wrap-info")}>
          <a
            className={cx("post-reply-item-wrap-info-avatar")}
            href={`https://github.com/${reply.user.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className={cx("post-reply-item-wrap-info-avatar-img")}
              src={reply.user.avatar}
              alt={reply.user.avatar}
            />
          </a>
          <div className={cx("post-reply-item-wrap-info-container")}>
            <div className={cx("post-reply-item-wrap-info-container-area")}>
              <a
                className={cx("post-reply-item-wrap-info-container-area-name")}
                href={`https://github.com/${reply.user.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3>{reply.user.name}</h3>
              </a>
            </div>
            <p>{getTimeCount(reply.created_at)}</p>
          </div>
        </div>
        {login && reply.user.idx === profile.idx && (
          <React.Fragment>
            {!updateMode && (
              <div className={cx("post-reply-item-wrap-control")}>
                <p className={cx("post-reply-item-wrap-control-update")} onClick={onUpdateHandler}>
                  <FaPen />
                </p>
                <p
                  className={cx("post-reply-item-wrap-control-delete")}
                  onClick={() => onDeleteHandler(reply.idx)}
                >
                  <FaTrash />
                </p>
              </div>
            )}
          </React.Fragment>
        )}
      </div>
      {updateMode ? (
        <PostReplyHandle
          content={content}
          onChange={onChangeContent}
          onKeyDown={onKeyDownContent}
          onComplete={updateReplyHandler}
          onCancel={onCancelUpdateHandler}
        />
      ) : (
        <p className={cx("post-reply-item-content")}>{reply.content}</p>
      )}
    </div>
  );
};

export default PostReplyItem;
