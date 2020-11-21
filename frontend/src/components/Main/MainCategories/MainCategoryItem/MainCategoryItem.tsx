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

  return (
    <>
      {isTotal ? (
        <Link to="/" className="Main-Category-Item">
          <p
            className={
              query.get("tab") === null
                ? "Main-Category-Item-Name-Active Main-Category-Item-Name"
                : "Main-Category-Item-Name"
            }
          >
            {category.name}
          </p>
          <p className="Main-Category-Item-Count">({category.post_count})</p>
        </Link>
      ) : (
        <Link to={`/${path}`} className="Main-Category-Item">
          <p
            className={
              Number(query.get("tab")) === category.idx
                ? "Main-Category-Item-Name-Active Main-Category-Item-Name"
                : "Main-Category-Item-Name"
            }
          >
            {category.name}
          </p>
          <p className="Main-Category-Item-Count">({category.post_count})</p>
        </Link>
      )}
    </>
  );
};

export default MainCategoryItem;
