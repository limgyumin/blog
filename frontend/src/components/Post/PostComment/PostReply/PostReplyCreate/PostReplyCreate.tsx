import React, { useEffect, useRef } from "react";
import "./PostReplyCreate.scss";

interface PostReplyCreateProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  confirmListener: () => Promise<void>;
  cancelListener: () => void;
  keyDownListener: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  label?: string;
}

const PostReplyCreate = ({
  content,
  setContent,
  confirmListener,
  cancelListener,
  keyDownListener,
  label,
}: PostReplyCreateProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textAreaRef.current!.style.height = "0px";
    const scrollHeight = textAreaRef.current!.scrollHeight;
    textAreaRef.current!.style.height = scrollHeight + "px";
  }, [content]);

  return (
    <>
      <div className="Post-Reply-Create">
        <textarea
          ref={textAreaRef}
          value={content}
          autoFocus
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => keyDownListener(e)}
          placeholder="Write a reply ..."
          className="Post-Reply-Create-Box"
        />
        <div className="Post-Reply-Create-Wrapper">
          <button
            className="Post-Reply-Create-Wrapper-Button"
            onClick={() => confirmListener()}
          >
            {label || "Send"}
          </button>
          <button
            className="Post-Reply-Create-Wrapper-Cancel"
            onClick={() => cancelListener()}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default PostReplyCreate;
