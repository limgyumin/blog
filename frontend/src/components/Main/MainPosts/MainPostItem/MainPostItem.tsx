import React from "react";
import "./MainPostItem.scss";
import { RiChat3Line } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import PostType from "../../../../util/types/Post";
import { Link } from "react-router-dom";
import getDateFormat from "../../../../util/lib/getDateFormat";

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
            <div className="Main-Post-Item-Thumbnail-Shadow">
              <div className="Main-Post-Item-Thumbnail-Shadow-Wrapper">
                <div className="Main-Post-Item-Thumbnail-Shadow-Wrapper-Comment">
                  <RiChat3Line />
                  <p>{post.comment_count}</p>
                </div>
                <div className="Main-Post-Item-Thumbnail-Shadow-Wrapper-Like">
                  <AiOutlineHeart />
                  <p>{post.like_count}</p>
                </div>
              </div>
            </div>
            <img
              src={post.thumbnail}
              alt="Thumbnail"
              className="Main-Post-Item-Thumbnail-Image"
            />
          </div>
        )}
        <div className="Main-Post-Item-Content">
          <div className="Main-Post-Item-Content-Wrapper">
            <span className="Main-Post-Item-Content-Wrapper-Category">
              {post.category_name}
            </span>
            <span className="Main-Post-Item-Content-Wrapper-Date">
              {getDateFormat(post.created_at)}
            </span>
          </div>
          <div className="Main-Post-Item-Content-Info">
            <div className="Main-Post-Item-Content-Info-Title">
              <span>{post.title}</span>
              <p>↗</p>
            </div>
            <span className="Main-Post-Item-Content-Info-Description">
              {post.description}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default MainPostItem;
