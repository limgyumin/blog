import React from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import CommentType from "../../../../util/types/Comment";
import "./PostCommentItem.scss";
import UserType from "../../../../util/types/User";
import getTimeCount from "../../../../util/lib/getTimeCount";
import PostReplyContainer from "../../../../containers/Post/PostReplyContainer";

interface PostCommentItemProps {
  user: UserType;
  login: boolean;
  comment: CommentType;
  enable: boolean;
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  handleCommentCountCallback: () => Promise<void>;
  handleModifyCommentCallback: () => void;
  handleModifyCancelCallback: () => void;
  keyDownListener: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  deleteClickListener: (idx: number) => void;
}

const PostCommentItem = ({
  user,
  login,
  comment,
  enable,
  setEnable,
  content,
  setContent,
  handleCommentCountCallback,
  handleModifyCommentCallback,
  handleModifyCancelCallback,
  keyDownListener,
  deleteClickListener,
}: PostCommentItemProps) => {
  return (
    <>
      <div className="Post-Comment-Item">
        <div className="Post-Comment-Item-Wrapper">
          <div className="Post-Comment-Item-Wrapper-Info">
            <a
              className="Post-Comment-Item-Wrapper-Info-Avatar"
              href={`https://github.com/${comment.user.id}`}
              target="_blank"
            >
              <img src={comment.user.avatar} alt={comment.user.avatar} />
            </a>
            <div className="Post-Comment-Item-Wrapper-Info-Container">
              <div className="Post-Comment-Item-Wrapper-Info-Container-Area">
                <a
                  className="Post-Comment-Item-Wrapper-Info-Container-Area-Name"
                  href={`https://github.com/${comment.user.id}`}
                  target="_blank"
                >
                  <h3>{comment.user.name}</h3>
                </a>
              </div>
              <p>{getTimeCount(comment.created_at)}</p>
            </div>
          </div>
          {login && comment.user.idx === user.idx && (
            <>
              {!enable && (
                <div className="Post-Comment-Item-Wrapper-Control">
                  <p
                    className="Post-Comment-Item-Wrapper-Control-Edit"
                    onClick={() => setEnable(true)}
                  >
                    <FaPen />
                  </p>
                  <p
                    className="Post-Comment-Item-Wrapper-Control-Delete"
                    onClick={() => deleteClickListener(comment.idx)}
                  >
                    <FaTrash />
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        {enable ? (
          <div className="Post-Comment-Item-Input">
            <textarea
              value={content}
              autoFocus
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => keyDownListener(e)}
              placeholder="Write a comment ..."
              className="Post-Comment-Item-Input-Box"
            />
            <div className="Post-Comment-Item-Input-Wrapper">
              <button
                className="Post-Comment-Item-Input-Wrapper-Button"
                onClick={() => handleModifyCommentCallback()}
              >
                Update
              </button>
              <button
                className="Post-Comment-Item-Input-Wrapper-Cancel"
                onClick={() => handleModifyCancelCallback()}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p>{comment.content}</p>
        )}
        <PostReplyContainer
          commentIdx={comment.idx}
          handleCommentCountCallback={handleCommentCountCallback}
        />
      </div>
    </>
  );
};

export default PostCommentItem;
