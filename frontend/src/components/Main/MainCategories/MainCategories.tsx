import React from "react";
import { Link } from "react-router-dom";
import { CategoryType } from "../../../util/types/Category";
import "./MainCategories.scss";
import MainCategoryItem from "./MainCategoryItem";

interface MainCategoriesProps {
  categories: CategoryType[];
  totalView: CategoryType;
}

const MainCategories = ({ categories, totalView }: MainCategoriesProps) => {
  const CATEGORY_MAX_COUNT = 15;
  return (
    <>
      <div className="Main-Categories">
        <div className="Main-Categories-Container">
          <p className="Main-Categories-Container-Title">Categories</p>
          <div className="Main-Categories-Container-List">
            <MainCategoryItem category={totalView} />
            {categories.map((category, idx) => (
              <React.Fragment key={idx}>
                {idx < CATEGORY_MAX_COUNT && (
                  <MainCategoryItem category={category} />
                )}
              </React.Fragment>
            ))}
            {categories.length > CATEGORY_MAX_COUNT && (
              <Link
                to="/categories"
                className="Main-Categories-Container-List-All"
              >
                <p className="Main-Categories-Container-List-All-Text">
                  ... View all Categories
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainCategories;
