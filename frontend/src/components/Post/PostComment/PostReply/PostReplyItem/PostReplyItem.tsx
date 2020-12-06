import React from "react";
import getTimeCount from "../../../../../util/lib/getTimeCount";
import ReplyType from "../../../../../util/types/Reply";
import UserType from "../../../../../util/types/User";
import PostReplyCreate from "../PostReplyCreate";
import "./PostReplyItem.scss";

interface PostReplyItemProps {
  reply: ReplyType;
  user: UserType;
  login: boolean;
  enable: boolean;
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  deleteClickListener: (idx: number) => void;
  handleModifyReplyCallback: () => Promise<void>;
  handleModifyCancelCallback: () => void;
  keyDownListener: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const PostReplyItem = ({
  reply,
  user,
  login,
  enable,
  setEnable,
  content,
  setContent,
  deleteClickListener,
  handleModifyReplyCallback,
  handleModifyCancelCallback,
  keyDownListener,
}: PostReplyItemProps) => {
  return (
    <>
      <div className="Post-Reply-Item">
        <div className="Post-Reply-Item-Wrapper">
          <div className="Post-Reply-Item-Wrapper-Info">
            <img src={reply.user.avatar} alt={reply.user.avatar} />
            <div className="Post-Reply-Item-Wrapper-Info-Container">
              <h3>{reply.user.name}</h3>
              <p>{getTimeCount(reply.created_at)}</p>
            </div>
          </div>
          {login && reply.user.idx === user.idx && (
            <>
              {!enable && (
                <div className="Post-Reply-Item-Wrapper-Control">
                  <p
                    className="Post-Reply-Item-Wrapper-Control-Edit"
                    onClick={() => setEnable(true)}
                  >
                    수정
                  </p>
                  <p
                    className="Post-Reply-Item-Wrapper-Control-Delete"
                    onClick={() => deleteClickListener(reply.idx)}
                  >
                    삭제
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        {enable ? (
          <PostReplyCreate
            content={content}
            setContent={setContent}
            confirmListener={handleModifyReplyCallback}
            cancelListener={handleModifyCancelCallback}
            keyDownListener={keyDownListener}
            label="수정하기"
          />
        ) : (
          <p>{reply.content}</p>
        )}
      </div>
    </>
  );
};

export default PostReplyItem;
