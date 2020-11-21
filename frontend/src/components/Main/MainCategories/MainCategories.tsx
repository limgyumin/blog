import React from "react";
import { CategoryType } from "../../../util/types/Category";
import "./MainCategories.scss";
import MainCategoryItem from "./MainCategoryItem";

interface MainCategoriesProps {
  categories: CategoryType[];
  totalPostCount: number;
}

const MainCategories = ({
  categories,
  totalPostCount,
}: MainCategoriesProps) => {
  const total_view = {
    idx: 0,
    name: "전체",
    post_count: totalPostCount,
  };
  return (
    <>
      <div className="Main-Categories">
        <p className="Main-Categories-Title">카테고리</p>
        <div className="Main-Categories-List">
          <MainCategoryItem category={total_view} />
          {categories.map((category, idx) => (
            <MainCategoryItem key={idx} category={category} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MainCategories;
