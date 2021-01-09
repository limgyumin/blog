import React from "react";
import { CategoryPostsType } from "../../util/types/Category";
import "./Categories.scss";
import CategoriesList from "./CategoriesListItem";

interface CategoriesProps {
  categoryPosts: CategoryPostsType[];
  admin: boolean;
  login: boolean;
}

const Categories = ({ categoryPosts, admin, login }: CategoriesProps) => {
  return (
    <>
      <div className="Categories">
        <div className="Categories-Wrapper">
          <div className="Categories-Wrapper-Header">
            <p className="Categories-Wrapper-Header-Title">Categories</p>
            {admin && login && (
              <div className="Categories-Wrapper-Header-Control">
                <p className="Categories-Wrapper-Header-Control-Edit">수정</p>
                <p className="Categories-Wrapper-Header-Control-Delete">삭제</p>
              </div>
            )}
          </div>
          <div className="Categories-Wrapper-List">
            {categoryPosts.map((categoryPost, idx) => (
              <React.Fragment key={idx}>
                <CategoriesList categoryPost={categoryPost} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
