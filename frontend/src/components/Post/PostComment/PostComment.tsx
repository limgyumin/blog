import React from "react";
import PostCommentItemContainer from "../../../containers/Post/PostCommentItemContainer";
import CommentType from "../../../util/types/Comment";
import "./PostComment.scss";

/**
 * 댓글 개수, 댓글 생성 담당
 */

interface PostCommentProps {
  comments: CommentType[];
  commentCount: number;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setCommentIdx: React.Dispatch<React.SetStateAction<number>>;
  showModalCallback: () => void;
  handleCreateCommentCallback: () => Promise<void>;
  handleCommentCountCallback: () => Promise<void>;
  handleCommentsCallback: () => Promise<void>;
  keyDownListener: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  commentRef: React.RefObject<HTMLDivElement>;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
}

const PostComment = ({
  comments,
  commentCount,
  content,
  setContent,
  setCommentIdx,
  showModalCallback,
  handleCreateCommentCallback,
  handleCommentCountCallback,
  handleCommentsCallback,
  keyDownListener,
  commentRef,
  textAreaRef,
}: PostCommentProps) => {
  return (
    <>
      <div className="Post-Comment">
        <div className="Post-Comment-Container">
          <p className="Post-Comment-Container-Count">
            {commentCount} Comments
          </p>
          <div className="Post-Comment-Container-Input">
            <textarea
              ref={textAreaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => keyDownListener(e)}
              placeholder="Write a comment ..."
              className="Post-Comment-Container-Input-Box"
            />
            <div className="Post-Comment-Container-Input-Wrapper">
              <button
                className="Post-Comment-Container-Input-Wrapper-Button"
                onClick={() => handleCreateCommentCallback()}
              >
                Send
              </button>
            </div>
          </div>
        </div>
        <div className="Post-Comment-List" ref={commentRef}>
          {comments.map((comment) => (
            <PostCommentItemContainer
              key={comment.idx}
              comment={comment}
              showModalCallback={showModalCallback}
              setCommentIdx={setCommentIdx}
              handleCommentCountCallback={handleCommentCountCallback}
              handleCommentsCallback={handleCommentsCallback}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PostComment;
