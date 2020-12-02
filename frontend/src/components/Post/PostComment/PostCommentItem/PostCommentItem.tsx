import React, { ReactNodeArray } from "react";
import CommentType from "../../../../util/types/Comment";
import "./PostCommentItem.scss";
import moment from "moment";
import UserType from "../../../../util/types/User";

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
}: PostCommentItemProps) => {
  return (
    <>
      <div className="Post-Comment-Item">
        <div className="Post-Comment-Item-Wrapper">
          <div className="Post-Comment-Item-Wrapper-Info">
            <img src={comment.user.avatar} alt={comment.user.avatar} />
            <div className="Post-Comment-Item-Wrapper-Info-Container">
              <h3>{comment.user.name}</h3>
              <p>{moment(comment.created_at).format("YYYY년 M월 D일")}</p>
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
                  <p className="Post-Comment-Item-Wrapper-Control-Delete">
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
      </div>
    </>
  );
};

export default PostCommentItem;
