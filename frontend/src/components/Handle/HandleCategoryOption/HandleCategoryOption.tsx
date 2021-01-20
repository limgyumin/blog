import React, { useEffect } from "react";
import { CategoryType } from "../../../util/types/Category";
import "./HandleCategoryOption.scss";

interface HandleCategoryOptionProps {
  categories: CategoryType[];
  setShowOption: React.Dispatch<React.SetStateAction<boolean>>;
  categoryItemHandler: (name: string, idx: number) => void;
}

const HandleCategoryOption = ({
  categories,
  setShowOption,
  categoryItemHandler,
}: HandleCategoryOptionProps) => {
  const closeOption = (e: any) => {
    if (
      e.target &&
      !(
        e.target.classList.contains("Header-Option") ||
        e.target.classList.contains("Header-Option-MyProfile") ||
        e.target.classList.contains("Header-Option-MyProfile-Text") ||
        e.target.classList.contains("Header-Option-ReadList") ||
        e.target.classList.contains("Header-Option-ReadList-Text") ||
        e.target.classList.contains("Header-Option-TempList") ||
        e.target.classList.contains("Header-Option-TempList-Text") ||
        e.target.classList.contains("Header-Option-Logout") ||
        e.target.classList.contains("Header-Option-Logout-Text")
      )
    ) {
      setShowOption(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeOption);
    return () => document.removeEventListener("click", closeOption);
  }, []);

  return (
    <>
      <div className="Handle-Category-Option">
        {categories.map((category) => (
          <div
            key={category.idx}
            className="Handle-Category-Option-Item"
            onClick={() => categoryItemHandler(category.name, category.idx)}
          >
            <span className="Handle-Category-Option-Item-Name">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default HandleCategoryOption;
