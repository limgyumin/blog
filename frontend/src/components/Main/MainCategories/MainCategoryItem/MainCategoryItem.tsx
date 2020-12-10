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
          <p
            className={
              isMain
                ? "Main-Category-Item-Name-Active Main-Category-Item-Name"
                : "Main-Category-Item-Name"
            }
          >
            {category.name}
          </p>
          <p
            className={
              isMain
                ? "Main-Category-Item-Count-Active Main-Category-Item-Count"
                : "Main-Category-Item-Count"
            }
          >
            ({category.post_count})
          </p>
        </Link>
      ) : (
        <Link
          to={`/${path}`}
          className={
            isCorrect
              ? "Main-Category-Item-Active Main-Category-Item"
              : "Main-Category-Item"
          }
        >
          <p
            className={
              isCorrect
                ? "Main-Category-Item-Name-Active Main-Category-Item-Name"
                : "Main-Category-Item-Name"
            }
          >
            {category.name}
          </p>
          <p
            className={
              isCorrect
                ? "Main-Category-Item-Count-Active Main-Category-Item-Count"
                : "Main-Category-Item-Count"
            }
          >
            ({category.post_count})
          </p>
        </Link>
      )}
    </>
  );
};

export default MainCategoryItem;
