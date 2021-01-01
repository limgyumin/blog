import React from "react";
import { CategoryType } from "../../../util/types/Category";
import "./MainCategories.scss";
import MainCategoryItem from "./MainCategoryItem";

interface MainCategoriesProps {
  categories: CategoryType[];
  totalView: CategoryType;
}

const MainCategories = ({ categories, totalView }: MainCategoriesProps) => {
  return (
    <>
      <div className="Main-Categories">
        <div className="Main-Categories-Container">
          <p className="Main-Categories-Container-Title">Categories</p>
          <div className="Main-Categories-Container-List">
            <MainCategoryItem category={totalView} />
            {categories.map((category, idx) => (
              <MainCategoryItem key={idx} category={category} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainCategories;
