import React from "react";
import "./MainPostItem.scss";
import moment from "moment";
import chat from "../../../../assets/images/chat.svg";
import like from "../../../../assets/images/like.svg";

interface MainPostItemProps {
  post: PostType;
}

interface PostType {
  idx: number;
  title: string;
  description: string;
  thumbnail: string;
  created_at: Date;
  comment_count: number;
  like_count: number;
}

const MainPostItem = ({ post }: MainPostItemProps) => {
  return (
    <>
      <div className="Main-Post-Item">
        <div className="Main-Post-Item-Thumbnail"></div>
        <div className="Main-Post-Item-Content">
          <span className="Main-Post-Item-Content-Title">{post.title}</span>
          <span className="Main-Post-Item-Content-Description">
            {post.description}
          </span>
        </div>
        <div className="Main-Post-Item-Bottom">
          <span className="Main-Post-Item-Bottom-CreatedAt">
            {moment(post.created_at).format("YYYY년 MM월 DD일")}
          </span>
          <div className="Main-Post-Item-Bottom-Count">
            <div className="Main-Post-Item-Bottom-Count-Comment">
              <img src={chat} alt={chat} />
              <span>{post.comment_count}</span>
            </div>
            <div className="Main-Post-Item-Bottom-Count-Like">
              <img src={like} alt={like} />
              <span>{post.like_count}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPostItem;
