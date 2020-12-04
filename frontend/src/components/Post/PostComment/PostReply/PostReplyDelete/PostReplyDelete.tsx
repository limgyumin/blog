import React from "react";
import "./PostReplyDelete.scss";

interface PostReplyDeleteProps {
  showModal: () => void;
  handleDeleteReplyCallback: () => Promise<void>;
}

const PostReplyDelete = ({
  showModal,
  handleDeleteReplyCallback,
}: PostReplyDeleteProps) => {
  return (
    <>
      <div className="Post-Reply-Delete">
        <div className="Post-Reply-Delete-Content">
          <h2>답글 삭제</h2>
          <p>정말로 답글을 삭제하시겠어요?</p>
        </div>
        <div className="Post-Reply-Delete-Button">
          <button
            className="Post-Reply-Delete-Button-Delete"
            onClick={() => handleDeleteReplyCallback()}
          >
            삭제
          </button>
          <button
            className="Post-Reply-Delete-Button-Cancel"
            onClick={() => showModal()}
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default PostReplyDelete;
