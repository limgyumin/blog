import React from "react";
import "./PostDelete.scss";

interface PostDeleteProps {
  deletePostHandler: () => Promise<void>;
  showModalCallback: () => void;
}

const PostDelete = ({
  deletePostHandler,
  showModalCallback,
}: PostDeleteProps) => {
  return (
    <>
      <div className="Post-Delete">
        <div className="Post-Delete-Content">
          <h2>게시글 삭제</h2>
          <p>정말로 게시글을 삭제하시겠어요?</p>
        </div>
        <div className="Post-Delete-Button">
          <button
            className="Post-Delete-Button-Delete"
            onClick={() => deletePostHandler()}
          >
            삭제
          </button>
          <button
            className="Post-Delete-Button-Cancel"
            onClick={() => showModalCallback()}
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default PostDelete;
