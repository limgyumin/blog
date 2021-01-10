import React from "react";
import { FaExchangeAlt, FaPen, FaTrash } from "react-icons/fa";
import { RiFolderAddFill } from "react-icons/ri";
import { CategoryPostsType } from "../../util/types/Category";
import "./Categories.scss";
import CategoriesList from "./CategoriesListItem";

interface CategoriesProps {
  categoryPosts: CategoryPostsType[];
  admin: boolean;
  login: boolean;
  deleteMode: boolean;
  setDeleteMode: React.Dispatch<React.SetStateAction<boolean>>;
  deleteCategoryHandler: (idx: number) => void;
}

const Categories = ({
  categoryPosts,
  admin,
  login,
  deleteMode,
  setDeleteMode,
  deleteCategoryHandler,
}: CategoriesProps) => {
  return (
    <>
      <div className="Categories">
        <div className="Categories-Wrapper">
          <div className="Categories-Wrapper-Header">
            <p className="Categories-Wrapper-Header-Title">Categories</p>
            {admin && login && (
              <div className="Categories-Wrapper-Header-Control">
                {!deleteMode && (
                  <div className="Categories-Wrapper-Header-Control-Add">
                    <RiFolderAddFill />
                  </div>
                )}
                {!deleteMode && (
                  <div className="Categories-Wrapper-Header-Control-Edit">
                    <FaPen />
                  </div>
                )}
                <div
                  className="Categories-Wrapper-Header-Control-Delete"
                  onClick={() => setDeleteMode((prev) => !prev)}
                >
                  {deleteMode ? "완료" : <FaTrash />}
                </div>
                {!deleteMode && (
                  <div className="Categories-Wrapper-Header-Control-Order">
                    <FaExchangeAlt />
                  </div>
                )}
              </div>
            )}
          </div>
          <div
            className={
              deleteMode
                ? "Categories-Wrapper-List-Delete Categories-Wrapper-List"
                : "Categories-Wrapper-List"
            }
          >
            {categoryPosts.map((categoryPost, idx) => (
              <React.Fragment key={idx}>
                <CategoriesList
                  categoryPost={categoryPost}
                  deleteMode={deleteMode}
                  deleteCategoryHandler={deleteCategoryHandler}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
