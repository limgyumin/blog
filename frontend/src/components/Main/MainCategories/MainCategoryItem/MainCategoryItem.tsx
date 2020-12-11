import React from "react";
import { Link } from "react-router-dom";
import useQuery from "../../../../util/lib/hooks/useQuery";
import { CategoryType } from "../../../../util/types/Category";
import "./MainCategoryItem.scss";

interface MainCategoryItemProps {
  category: CategoryType;
}

const MainCategoryItem = ({ category }: MainCategoryItemProps) => {
  const query = useQuery();
  const isTotal = category.idx === 0;
  const path = `?tab=${category.idx}`;
  const isMain = query.get("tab") === null;
  const isCorrect = Number(query.get("tab")) === category.idx;

  return (
    <>
      {isTotal ? (
        <Link
          to="/"
          className={
            isMain
              ? "Main-Category-Item-Active Main-Category-Item"
              : "Main-Category-Item"
          }
        >
          <div className="Main-Category-Item-Wrapper">
            <p
              className={
                isMain
                  ? "Main-Category-Item-Wrapper-Name-Active Main-Category-Item-Wrapper-Name"
                  : "Main-Category-Item-Wrapper-Name"
              }
            >
              {category.name}
            </p>
          </div>
          <div
            className={
              isCorrect
                ? "Main-Category-Item-Count-Active Main-Category-Item-Count"
                : "Main-Category-Item-Count"
            }
          >
            {category.post_count}
          </div>
        </Link>
      ) : (
        <Link
          to={`${path}`}
          className={
            isCorrect
              ? "Main-Category-Item-Active Main-Category-Item"
              : "Main-Category-Item"
          }
        >
          <div className="Main-Category-Item-Wrapper">
            <p
              className={
                isCorrect
                  ? "Main-Category-Item-Wrapper-Name-Active Main-Category-Item-Wrapper-Name"
                  : "Main-Category-Item-Wrapper-Name"
              }
            >
              {category.name}
            </p>
          </div>
          <div
            className={
              isCorrect
                ? "Main-Category-Item-Count-Active Main-Category-Item-Count"
                : "Main-Category-Item-Count"
            }
          >
            {category.post_count}
          </div>
        </Link>
      )}
    </>
  );
};

export default MainCategoryItem;
