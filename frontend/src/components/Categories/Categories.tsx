import React from "react";
import { CategoryPostsType } from "../../util/types/Category";
import "./Categories.scss";
import CategoriesList from "./CategoriesListItem";

interface CategoriesProps {
  categoryPosts: CategoryPostsType[];
}

const Categories = ({ categoryPosts }: CategoriesProps) => {
  return (
    <>
      <div className="Categories">
        <div className="Categories-Wrapper">
          <p className="Categories-Wrapper-Title">Categories</p>
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
