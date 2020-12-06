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
}: PostReplyProps) => {
  return (
    <>
      <div className="Post-Reply">
        {show ? (
          <>
            <div className="Post-Reply-Count" onClick={() => setShow(!show)}>
              <BiMessageSquareMinus />
              <span>숨기기</span>
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
                      답글 작성하기
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
          </>
        ) : (
          <>
            <div className="Post-Reply-Count" onClick={() => setShow(!show)}>
              {replyCount ? (
                <>
                  <BiMessageSquareAdd />
                  <span>{replyCount}개의 답글</span>
                </>
              ) : (
                <>
                  <BiMessageSquareAdd />
                  <span>답글 달기</span>
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
