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
}: PostCommentProps) => {
  return (
    <>
      <div className="Post-Comment">
        <div className="Post-Comment-Container">
          <p className="Post-Comment-Container-Count">
            {commentCount}개의 댓글
          </p>
          <div className="Post-Comment-Container-Input">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => keyDownListener(e)}
              placeholder="댓글을 작성해주세요."
              className="Post-Comment-Container-Input-Box"
            />
            <div className="Post-Comment-Container-Input-Wrapper">
              <button
                className="Post-Comment-Container-Input-Wrapper-Button"
                onClick={() => handleCreateCommentCallback()}
              >
                작성하기
              </button>
            </div>
          </div>
        </div>
        <div className="Post-Comment-List">
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
