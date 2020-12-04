import React from "react";
import "./PostReplyCreate.scss";

interface PostReplyCreateProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  handleCreateReplyCallback: () => Promise<void>;
  handleCreateCancelCallback: () => void;
  keyDownListener: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const PostReplyCreate = ({
  content,
  setContent,
  handleCreateReplyCallback,
  handleCreateCancelCallback,
  keyDownListener,
}: PostReplyCreateProps) => {
  return (
    <>
      <div className="Post-Reply-Create">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => keyDownListener(e)}
          placeholder="답글을 작성해주세요."
          className="Post-Reply-Create-Box"
        />
        <div className="Post-Reply-Create-Wrapper">
          <button
            className="Post-Reply-Create-Wrapper-Button"
            onClick={() => handleCreateReplyCallback()}
          >
            작성하기
          </button>
          <button
            className="Post-Reply-Create-Wrapper-Cancel"
            onClick={() => handleCreateCancelCallback()}
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default PostReplyCreate;
