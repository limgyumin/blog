import React from "react";
import { IoMdAdd } from "react-icons/io";
import { FiEdit2 } from "react-icons/fi";
import { CategoryPostsType } from "../../util/types/Category";
import "./Categories.scss";
import CategoriesListItemContainer from "../../containers/Categories/CategoriesListItemContainer";

interface CategoriesProps {
  categoryPosts: CategoryPostsType[];
  admin: boolean;
  login: boolean;
  categoryName: string;
  createMode: boolean;
  editMode: boolean;
  setCreateMode: React.Dispatch<React.SetStateAction<boolean>>;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setCategoryName: React.Dispatch<React.SetStateAction<string>>;
  keyDownListener: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleCategoryPostsCallback: () => Promise<void>;
  handleCategoriesCallback: () => Promise<void>;
}

const Categories = ({
  categoryPosts,
  admin,
  login,
  categoryName,
  createMode,
  editMode,
  setCreateMode,
  setEditMode,
  setCategoryName,
  keyDownListener,
  handleCategoryPostsCallback,
  handleCategoriesCallback,
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
              <div className="Categories-Wrapper-Container-Control">
                <button
                  className="Categories-Wrapper-Container-Control-Create"
                  onClick={() => setCreateMode((prev) => !prev)}
                >
                  <IoMdAdd
                    className={
                      createMode
                        ? "Categories-Wrapper-Container-Control-Create-Icon-Active Categories-Wrapper-Container-Control-Create-Icon"
                        : "Categories-Wrapper-Container-Control-Create-Icon"
                    }
                  />
                  <p className="Categories-Wrapper-Container-Control-Create-Content">
                    {createMode ? "취소" : "추가"}
                  </p>
                </button>
                <button
                  className="Categories-Wrapper-Container-Control-Edit"
                  onClick={() => setEditMode((prev) => !prev)}
                >
                  <FiEdit2 className="Categories-Wrapper-Container-Control-Edit-Icon" />
                  <p className="Categories-Wrapper-Container-Control-Edit-Content">
                    {editMode ? "취소" : "수정"}
                  </p>
                </button>
              </div>
            </div>
          )}
          <p className="Categories-Wrapper-Title">Categories</p>
          <div
            className={
              editMode
                ? "Categories-Wrapper-List-Delete Categories-Wrapper-List"
                : "Categories-Wrapper-List"
            }
          >
            {categoryPosts.map((categoryPost, idx) => (
              <React.Fragment key={idx}>
                <CategoriesListItemContainer
                  handleCategoryPostsCallback={handleCategoryPostsCallback}
                  handleCategoriesCallback={handleCategoriesCallback}
                  categoryPost={categoryPost}
                  editMode={editMode}
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
