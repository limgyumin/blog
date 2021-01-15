import React from "react";
import { BiMessageSquareAdd, BiMessageSquareMinus } from "react-icons/bi";
import PostReplyItemContainer from "../../../../containers/Post/PostReplyItemContainer";
import ReplyType from "../../../../util/types/Reply";
import "./PostReply.scss";
import PostReplyCreate from "./PostReplyCreate";

interface PostReplyProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  replies: ReplyType[];
  enable: boolean;
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
  replyCount: number;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setReplyIdx: React.Dispatch<React.SetStateAction<number>>;
  showModalCallback: () => void;
  handleCreateReplyCallback: () => Promise<void>;
  handleCreateCancelCallback: () => void;
  handleRepliesCallback: () => Promise<void>;
  keyDownListener: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  replyRef: React.RefObject<HTMLDivElement>;
}

const PostReply = ({
  show,
  setShow,
  replies,
  enable,
  setEnable,
  replyCount,
  content,
  setContent,
  setReplyIdx,
  showModalCallback,
  handleCreateReplyCallback,
  handleCreateCancelCallback,
  handleRepliesCallback,
  keyDownListener,
  replyRef,
}: PostReplyProps) => {
  return (
    <>
      <div className="Post-Reply">
        {show ? (
          <>
            <div className="Post-Reply-Count" onClick={() => setShow(!show)}>
              <BiMessageSquareMinus />
              <span>Hide</span>
            </div>
            <div className="Post-Reply-Container">
              {replyCount ? (
                <>
                  {replies.map((reply) => (
                    <PostReplyItemContainer
                      key={reply.idx}
                      reply={reply}
                      setReplyIdx={setReplyIdx}
                      showModalCallback={showModalCallback}
                      handleRepliesCallback={handleRepliesCallback}
                    />
                  ))}
                  {enable ? (
                    <PostReplyCreate
                      content={content}
                      setContent={setContent}
                      confirmListener={handleCreateReplyCallback}
                      cancelListener={handleCreateCancelCallback}
                      keyDownListener={keyDownListener}
                    />
                  ) : (
                    <button
                      className="Post-Reply-Container-Create"
                      onClick={() => setEnable(true)}
                    >
                      Leave a reply
                    </button>
                  )}
                </>
              ) : (
                <PostReplyCreate
                  content={content}
                  setContent={setContent}
                  confirmListener={handleCreateReplyCallback}
                  cancelListener={handleCreateCancelCallback}
                  keyDownListener={keyDownListener}
                />
              )}
            </div>
            <div ref={replyRef} />
          </>
        ) : (
          <>
            <div className="Post-Reply-Count" onClick={() => setShow(!show)}>
              {replyCount ? (
                <>
                  <BiMessageSquareAdd />
                  <span>{replyCount} Replies</span>
                </>
              ) : (
                <>
                  <BiMessageSquareAdd />
                  <span>Leave a reply</span>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PostReply;
