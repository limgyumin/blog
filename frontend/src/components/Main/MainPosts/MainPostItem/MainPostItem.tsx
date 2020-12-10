import React from "react";
import "./MainPostItem.scss";
import { RiChat3Line } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import PostType from "../../../../util/types/Post";
import { Link } from "react-router-dom";
import getTimeCount from "../../../../util/lib/getTimeCount";

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
          <div className="Main-Post-Item-Content-Info">
            <span className="Main-Post-Item-Content-Info-Title">
              {post.title}
            </span>
            <span className="Main-Post-Item-Content-Info-Description">
              {post.description}
            </span>
          </div>
          <span className="Main-Post-Item-Content-Category">
            <span>{post.category_name}</span> · {getTimeCount(post.created_at)}
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
              <RiChat3Line />
              <span>{post.comment_count}</span>
            </div>
            <div className="Main-Post-Item-Bottom-Count-Like">
              <AiOutlineHeart />
              <span>{post.like_count}</span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default MainPostItem;
