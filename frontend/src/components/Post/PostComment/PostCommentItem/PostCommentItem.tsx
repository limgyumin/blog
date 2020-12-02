import React from "react";
import CommentType from "../../../../util/types/Comment";
import "./PostCommentItem.scss";
import moment from "moment";

interface PostCommentItemProps {
  comment: CommentType;
}

const PostCommentItem = ({ comment }: PostCommentItemProps) => {
  return (
    <>
      <div className="Post-Comment-Item">
        <div className="Post-Comment-Item-Wrapper">
          <img src={comment.user.avatar} alt={comment.user.avatar} />
          <div className="Post-Comment-Item-Wrapper-Container">
            <h3>{comment.user.name}</h3>
            <p>{moment(comment.created_at).format("YYYY년 M월 D일")}</p>
          </div>
        </div>
        <p>{comment.content}</p>
      </div>
    </>
  );
};

export default PostCommentItem;
