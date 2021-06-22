import React, { FC } from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import IComment from "../../../../types/comment.type";
import getTimeCount from "../../../../lib/getTimeCount";
import useComment from "hooks/comment/useComment";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import PostReply from "../PostReply";

const styles = require("./PostCommentItem.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type PostCommentItemProps = {
  comment: IComment;
  onDeleteHandler: (idx: number) => void;
};

const PostCommentItem: FC<PostCommentItemProps> = ({ comment, onDeleteHandler }) => {
  const {
    login,
    profile,
    updateMode,
    content,
    onChangeContent,
    onKeyDownContent,
    onUpdateHandler,
    onCancelUpdateHandler,
    updateCommentHandler,
  } = useComment(comment);

  return (
    <div className={cx("post-comment-item")}>
      <div className={cx("post-comment-item-wrap")}>
        <div className={cx("post-comment-item-wrap-info")}>
          <a
            className={cx("post-comment-item-wrap-info-avatar")}
            href={`https://github.com/${comment.user.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={comment.user.avatar} alt={comment.user.avatar} />
          </a>
          <div className={cx("post-comment-item-wrap-info-container")}>
            <div className={cx("post-comment-item-wrap-info-container-area")}>
              <a
                className={cx("post-comment-item-wrap-info-container-area-name")}
                href={`https://github.com/${comment.user.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3>{comment.user.name}</h3>
              </a>
            </div>
            <p>{getTimeCount(comment.created_at)}</p>
          </div>
        </div>
        {login && comment.user.idx === profile.idx && (
          <React.Fragment>
            {!updateMode && (
              <div className={cx("post-comment-item-wrap-control")}>
                <p
                  className={cx("post-comment-item-wrap-control-update")}
                  onClick={onUpdateHandler}
                >
                  <FaPen />
                </p>
                <p
                  className={cx("post-comment-item-wrap-control-delete")}
                  onClick={() => onDeleteHandler(comment.idx)}
                >
                  <FaTrash />
                </p>
              </div>
            )}
          </React.Fragment>
        )}
      </div>
      {updateMode ? (
        <div className={cx("post-comment-item-input")}>
          <textarea
            value={content}
            autoFocus
            onChange={(e) => onChangeContent(e)}
            onKeyDown={(e) => onKeyDownContent(e)}
            placeholder="Write a comment ..."
            className={cx("post-comment-item-input-box")}
          />
          <div className={cx("post-comment-item-input-wrap")}>
            <button
              className={cx("post-comment-item-input-wrap-button")}
              onClick={updateCommentHandler}
            >
              Update
            </button>
            <button
              className={cx("post-comment-item-input-wrap-cancel")}
              onClick={onCancelUpdateHandler}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className={cx("post-comment-item-content")}>{comment.content}</p>
      )}
      <PostReply commentIdx={comment.idx} />
    </div>
  );
};

export default PostCommentItem;
