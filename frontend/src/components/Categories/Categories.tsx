import React from "react";
import { FaExchangeAlt, FaPen, FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { CategoryPostsType } from "../../util/types/Category";
import "./Categories.scss";
import CategoriesList from "./CategoriesListItem";

interface CategoriesProps {
  categoryPosts: CategoryPostsType[];
  admin: boolean;
  login: boolean;
  categoryName: string;
  createMode: boolean;
  modifyMode: boolean;
  deleteMode: boolean;
  setCreateMode: React.Dispatch<React.SetStateAction<boolean>>;
  setModifyMode: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteMode: React.Dispatch<React.SetStateAction<boolean>>;
  setCategoryName: React.Dispatch<React.SetStateAction<string>>;
  deleteCategoryHandler: (idx: number) => void;
  keyDownListener: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Categories = ({
  categoryPosts,
  admin,
  login,
  categoryName,
  createMode,
  modifyMode,
  deleteMode,
  setCreateMode,
  setModifyMode,
  setDeleteMode,
  setCategoryName,
  deleteCategoryHandler,
  keyDownListener,
}: CategoriesProps) => {
  return (
    <>
      <div className="Categories">
        <div className="Categories-Wrapper">
          {admin && login && (
            <div className="Categories-Wrapper-Container">
              <div
                className={
                  createMode
                    ? "Categories-Wrapper-Container-Name-Active Categories-Wrapper-Container-Name"
                    : "Categories-Wrapper-Container-Name"
                }
              >
                <input
                  className="Categories-Wrapper-Container-Name-Input"
                  type="text"
                  placeholder="카테고리 이름을 입력해주세용."
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  onKeyDown={(e) => keyDownListener(e)}
                />
              </div>
              <button
                className="Categories-Wrapper-Container-Create"
                onClick={() => setCreateMode((prev) => !prev)}
              >
                <IoMdAdd
                  className={
                    createMode
                      ? "Categories-Wrapper-Container-Create-Icon-Active Categories-Wrapper-Container-Create-Icon"
                      : "Categories-Wrapper-Container-Create-Icon"
                  }
                />
                <p className="Categories-Wrapper-Container-Create-Content">
                  {createMode ? "취소" : "카테고리 추가"}
                </p>
              </button>
            </div>
          )}
          <div className="Categories-Wrapper-Header">
            <p className="Categories-Wrapper-Header-Title">Categories</p>
            {admin && login && (
              <div className="Categories-Wrapper-Header-Control">
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
