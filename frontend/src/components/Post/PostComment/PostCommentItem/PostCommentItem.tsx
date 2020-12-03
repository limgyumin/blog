import React from "react";
import CommentType from "../../../../util/types/Comment";
import "./PostCommentItem.scss";
import UserType from "../../../../util/types/User";
import { IoIosArrowDown } from "react-icons/io";
import { BiMessageSquareAdd, BiMessageSquareMinus } from "react-icons/bi";
import getTimeCount from "../../../../util/lib/getTimeCount";
import ReplyType from "../../../../util/types/Reply";
import PostReplyContainer from "../../../../containers/Post/PostReplyContainer";

interface PostCommentItemProps {
  user: UserType;
  login: boolean;
  comment: CommentType;
  enable: boolean;
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
  edit: string;
  setEdit: React.Dispatch<React.SetStateAction<string>>;
  modifyTryCallback: () => void;
  modifyCancelCallback: () => void;
  keyDownListener: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  deleteClickListener: (idx: number) => void;
}

const PostCommentItem = ({
  user,
  login,
  comment,
  enable,
  setEnable,
  edit,
  setEdit,
  modifyTryCallback,
  modifyCancelCallback,
  keyDownListener,
  deleteClickListener,
}: PostCommentItemProps) => {
  return (
    <>
      <div className="Post-Comment-Item">
        <div className="Post-Comment-Item-Wrapper">
          <div className="Post-Comment-Item-Wrapper-Info">
            <img src={comment.user.avatar} alt={comment.user.avatar} />
            <div className="Post-Comment-Item-Wrapper-Info-Container">
              <h3>{comment.user.name}</h3>
              <p>{getTimeCount(comment.created_at)}</p>
            </div>
          </div>
          {login && comment.user.idx === user.idx && (
            <>
              {!enable && (
                <div className="Post-Comment-Item-Wrapper-Control">
                  <p
                    className="Post-Comment-Item-Wrapper-Control-Edit"
                    onClick={() => setEnable(true)}
                  >
                    수정
                  </p>
                  <p
                    className="Post-Comment-Item-Wrapper-Control-Delete"
                    onClick={() => deleteClickListener(comment.idx)}
                  >
                    삭제
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        {enable ? (
          <div className="Post-Comment-Item-Input">
            <textarea
              value={edit}
              onChange={(e) => setEdit(e.target.value)}
              onKeyDown={(e) => keyDownListener(e)}
              placeholder="댓글을 작성해주세요."
              className="Post-Comment-Item-Input-Box"
            />
            <div className="Post-Comment-Item-Input-Wrapper">
              <button
                className="Post-Comment-Item-Input-Wrapper-Button"
                onClick={() => modifyTryCallback()}
              >
                수정하기
              </button>
              <button
                className="Post-Comment-Item-Input-Wrapper-Cancel"
                onClick={() => modifyCancelCallback()}
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <p>{comment.content}</p>
        )}
        <PostReplyContainer comment={comment} />
      </div>
    </>
  );
};

export default PostCommentItem;
