import React from "react";
import "./MainPostItem.scss";
import moment from "moment";
import { ReactComponent as Chat } from "../../../../assets/images/chat.svg";
import { ReactComponent as Like } from "../../../../assets/images/like.svg";
import PostType from "../../../../util/types/Post";
import { Link } from "react-router-dom";

interface MainPostItemProps {
  post: PostType;
  postRef?: (node?: Element | null | undefined) => void;
}

const MainPostItem = ({ post, postRef }: MainPostItemProps) => {
  return (
    <>
      <Link to={`/post/${post.idx}`} className="Main-Post-Item" ref={postRef}>
        {post.thumbnail && (
          <div className="Main-Post-Item-Thumbnail">
            <img
              src={post.thumbnail}
              alt="Thumbnail"
              className="Main-Post-Item-Thumbnail-Image"
            />
          </div>
        )}
        <div className="Main-Post-Item-Content">
          <span className="Main-Post-Item-Content-Category">
            <span>{post.category_name}</span> ·{" "}
            {moment(post.created_at).format("YYYY년 M월 D일")}
          </span>
          <span className="Main-Post-Item-Content-Title">{post.title}</span>
          <span className="Main-Post-Item-Content-Description">
            {post.description}
          </span>
        </div>
        <div className="Main-Post-Item-Bottom">
          <div className="Main-Post-Item-Bottom-Profile">
            <img
              className="Main-Post-Item-Bottom-Profile-Avatar"
              src={post.user.avatar}
              alt={post.user.avatar}
            />
            <span className="Main-Post-Item-Bottom-Profile-Name">
              <span>by </span>
              {post.user.name}
            </span>
          </div>
          <div className="Main-Post-Item-Bottom-Count">
            <div className="Main-Post-Item-Bottom-Count-Comment">
              <Chat />
              <span>{post.comment_count}</span>
            </div>
            <div className="Main-Post-Item-Bottom-Count-Like">
              <Like />
              <span>{post.like_count}</span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default MainPostItem;
