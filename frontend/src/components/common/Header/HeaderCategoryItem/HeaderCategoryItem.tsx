import React from "react";
import { Link } from "react-router-dom";
import useQuery from "../../../../util/lib/hooks/useQuery";
import { CategoryType } from "../../../../util/types/Category";
import "./HeaderCategoryItem.scss";

interface HeaderCategoryItemProps {
  category: CategoryType;
}

const HeaderCategoryItem = ({ category }: HeaderCategoryItemProps) => {
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
              ? "Header-Category-Item-Active Header-Category-Item"
              : "Header-Category-Item"
          }
        >
          <p
            className={
              isMain
                ? "Header-Category-Item-Name-Active Header-Category-Item-Name"
                : "Header-Category-Item-Name"
            }
          >
            {category.name}
          </p>
          <p
            className={
              isMain
                ? "Header-Category-Item-Count-Active Header-Category-Item-Count"
                : "Header-Category-Item-Count"
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
              ? "Header-Category-Item-Active Header-Category-Item"
              : "Header-Category-Item"
          }
        >
          <p
            className={
              isCorrect
                ? "Header-Category-Item-Name-Active Header-Category-Item-Name"
                : "Header-Category-Item-Name"
            }
          >
            {category.name}
          </p>
          <p
            className={
              isCorrect
                ? "Header-Category-Item-Count-Active Header-Category-Item-Count"
                : "Header-Category-Item-Count"
            }
          >
            ({category.post_count})
          </p>
        </Link>
      )}
    </>
  );
};

export default HeaderCategoryItem;
