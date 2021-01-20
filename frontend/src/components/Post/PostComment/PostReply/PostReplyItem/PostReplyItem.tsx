import React from "react";
import { FaTrash, FaPen } from "react-icons/fa";
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
            <a
              className="Post-Reply-Item-Wrapper-Info-Avatar"
              href={`https://github.com/${reply.user.id}`}
              target="_blank"
            >
              <img src={reply.user.avatar} alt={reply.user.avatar} />
            </a>
            <div className="Post-Reply-Item-Wrapper-Info-Container">
              <div className="Post-Reply-Item-Wrapper-Info-Container-Area">
                <a
                  className="Post-Reply-Item-Wrapper-Info-Container-Area-Name"
                  href={`https://github.com/${reply.user.id}`}
                  target="_blank"
                >
                  <h3>{reply.user.name}</h3>
                </a>
              </div>
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
                    <FaPen />
                  </p>
                  <p
                    className="Post-Reply-Item-Wrapper-Control-Delete"
                    onClick={() => deleteClickListener(reply.idx)}
                  >
                    <FaTrash />
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
            label="Update"
          />
        ) : (
          <p>{reply.content}</p>
        )}
      </div>
    </>
  );
};

export default PostReplyItem;
