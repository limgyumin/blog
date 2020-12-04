import React from "react";
import "./PostCommentDelete.scss";

interface PostCommentDeleteProps {
  handleDeleteCommentCallback: () => Promise<void>;
  showModal: () => void;
}

const PostCommentDelete = ({
  handleDeleteCommentCallback,
  showModal,
}: PostCommentDeleteProps) => {
  return (
    <>
      <div className="Post-Comment-Delete">
        <div className="Post-Comment-Delete-Content">
          <h2>댓글 삭제</h2>
          <p>정말로 댓글을 삭제하시겠어요?</p>
        </div>
        <div className="Post-Comment-Delete-Button">
          <button
            className="Post-Comment-Delete-Button-Delete"
            onClick={() => handleDeleteCommentCallback()}
          >
            삭제
          </button>
          <button
            className="Post-Comment-Delete-Button-Cancel"
            onClick={() => showModal()}
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default PostCommentDelete;
