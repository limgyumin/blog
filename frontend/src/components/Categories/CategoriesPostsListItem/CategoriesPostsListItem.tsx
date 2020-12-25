import React from "react";
import { FaFolder } from "react-icons/fa";
import { Link } from "react-router-dom";
import getDateFormat from "../../../util/lib/getDateFormat";
import { PostNameType } from "../../../util/types/Category";
import "./CategoriesPostsListItem.scss";

interface CategoriesPostsListItemProps {
  post: PostNameType;
}

const CategoriesPostsListItem = ({ post }: CategoriesPostsListItemProps) => {
  return (
    <>
      <Link to={`/post/${post.idx}`} className="Categories-Posts-List-Item">
        <div className="Categories-Posts-List-Item-Info">
          <div className="Categories-Posts-List-Item-Info-Wrapper">
            <FaFolder />
            <p className="Categories-Posts-List-Item-Info-Wrapper-Name">
              {post.title}
            </p>
          </div>
          <p className="Categories-Posts-List-Item-Info-Date">
            {getDateFormat(post.created_at)}
          </p>
        </div>
      </Link>
    </>
  );
};

export default CategoriesPostsListItem;
