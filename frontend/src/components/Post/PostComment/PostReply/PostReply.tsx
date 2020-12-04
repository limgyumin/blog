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
  handleCreateReplyCallback: () => Promise<void>;
  handleRepliesCallback: () => Promise<void>;
  handleCreateCancel: () => void;
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
  handleCreateReplyCallback,
  handleRepliesCallback,
  handleCreateCancel,
  keyDownListener,
}: PostReplyProps) => {
  return (
    <>
      <div className="Post-Reply">
        {replyCount ? (
          <div
            className={
              show
                ? "Post-Reply-Count-Active Post-Reply-Count"
                : "Post-Reply-Count"
            }
            onClick={() => setShow(!show)}
          >
            {show ? (
              <>
                <BiMessageSquareMinus />
                <span>숨기기</span>
              </>
            ) : (
              <>
                <BiMessageSquareAdd />
                <span>{replyCount}개의 답글</span>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="Post-Reply-Add" onClick={() => setEnable(!enable)}>
              {enable ? (
                <>
                  <BiMessageSquareMinus />
                  <span>숨기기</span>
                </>
              ) : (
                <>
                  <BiMessageSquareAdd />
                  <span>답글 달기</span>
                </>
              )}
            </div>
            {enable && (
              <PostReplyCreate
                content={content}
                setContent={setContent}
                handleCreateReplyCallback={handleCreateReplyCallback}
                handleCreateCancel={handleCreateCancel}
                keyDownListener={keyDownListener}
              />
            )}
          </>
        )}
      </div>
      {replyCount && show ? (
        <div className="Post-Reply-Container">
          {replies.map((reply) => (
            <PostReplyItemContainer
              key={reply.idx}
              reply={reply}
              handleRepliesCallback={handleRepliesCallback}
            />
          ))}
          {enable ? (
            <PostReplyCreate
              content={content}
              setContent={setContent}
              handleCreateReplyCallback={handleCreateReplyCallback}
              handleCreateCancel={handleCreateCancel}
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
        </div>
      ) : null}
    </>
  );
};

export default PostReply;
