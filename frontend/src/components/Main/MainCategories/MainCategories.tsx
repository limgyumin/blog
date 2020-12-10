import React from "react";
import { CategoryType } from "../../../util/types/Category";
import { RiEdit2Fill } from "react-icons/ri";
import "./MainCategories.scss";
import MainCategoryItem from "./MainCategoryItem";

interface MainCategoriesProps {
  categories: CategoryType[];
  totalPostCount: number;
  admin: boolean;
}

const MainCategories = ({
  categories,
  totalPostCount,
  admin,
}: MainCategoriesProps) => {
  const total_view = {
    idx: 0,
    name: "전체",
    post_count: totalPostCount,
  };
  return (
    <>
      <div className="Main-Categories">
        <div className="Main-Categories-Container">
          <div className="Main-Categories-Container-List">
            <MainCategoryItem category={total_view} />
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
