import React from "react";
import { Link } from "react-router-dom";
import getDateFormat from "../../../util/lib/getDateFormat";
import PostType from "../../../util/types/Post";
import "./SearchPostItem.scss";

interface SearchPostItemProps {
  post: PostType;
}

const SearchPostItem = ({ post }: SearchPostItemProps) => {
  return (
    <>
      <Link to={`/post/${post.idx}`} className="Search-Post-Item">
        {post.thumbnail && (
          <div className="Search-Post-Item-Thumbnail">
            <img
              src={post.thumbnail}
              alt="Thumbnail"
              className="Search-Post-Item-Thumbnail-Image"
            />
          </div>
        )}
        <div className="Search-Post-Item-Content">
          <div className="Search-Post-Item-Content-Wrapper">
            <span className="Search-Post-Item-Content-Wrapper-Category">
              {post.category_name}
            </span>
            <span className="Search-Post-Item-Content-Wrapper-Date">
              {getDateFormat(post.created_at)}
            </span>
          </div>
          <div className="Search-Post-Item-Content-Info">
            <div className="Search-Post-Item-Content-Info-Title">
              <span>{post.title}</span>
              <p>↗</p>
            </div>
            <span className="Search-Post-Item-Content-Info-Description">
              {post.description}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default SearchPostItem;
