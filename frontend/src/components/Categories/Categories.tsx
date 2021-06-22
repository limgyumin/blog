import React from "react";
import { IoMdAdd } from "react-icons/io";
import { FiEdit2 } from "react-icons/fi";
import useCategory from "hooks/category/useCategory";
import useFetchCategoryPosts from "hooks/category/useFetchCategoryPosts";
import ReactHelmet from "components/common/ReactHelmet";
import { THUMBNAIL_URL } from "../../config/config.json";
import CategoryItem from "./CategoryItem";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./Categories.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const Categories = () => {
  const { categoryPosts } = useFetchCategoryPosts();
  const {
    admin,
    login,
    categoryName,
    createMode,
    editMode,
    onCategoryChange,
    onCreateCategoryKeyDown,
    createModeHandler,
    editModeHandler,
  } = useCategory();

  return (
    <React.Fragment>
      <ReactHelmet
        title="Categories | Nonamed"
        description="개발자를 꿈꾸는 한 학생의 이야기"
        url="https://nonamed.blog/categories"
        image={THUMBNAIL_URL}
      />
      <div className={cx("categories")}>
        <div className={cx("categories-wrap")}>
          {admin && login && (
            <div className={cx("categories-wrap-container")}>
              <div
                className={cx("categories-wrap-container-name", {
                  "categories-name-active": createMode,
                })}
              >
                <input
                  className={cx("categories-wrap-container-name-input")}
                  type="text"
                  placeholder="카테고리 이름을 입력해주세용."
                  value={categoryName}
                  onChange={(e) => onCategoryChange(e)}
                  onKeyDown={(e) => onCreateCategoryKeyDown(e)}
                />
              </div>
              <div className={cx("categories-wrap-container-control")}>
                <button
                  className={cx("categories-wrap-container-control-create")}
                  onClick={createModeHandler}
                >
                  <IoMdAdd
                    className={cx("categories-wrap-container-control-create-icon", {
                      "categories-icon-active": createMode,
                    })}
                  />
                  <p className={cx("categories-wrap-container-control-create-content")}>
                    {createMode ? "취소" : "추가"}
                  </p>
                </button>
                <button
                  className={cx("categories-wrap-container-control-edit")}
                  onClick={editModeHandler}
                >
                  <FiEdit2 className={cx("categories-wrap-container-control-edit-icon")} />
                  <p className={cx("categories-wrap-container-control-edit-content")}>
                    {editMode ? "취소" : "수정"}
                  </p>
                </button>
              </div>
            </div>
          )}
          <h1 className={cx("categories-wrap-title")}>Categories</h1>
          <h4 className={cx("categories-wrap-subtitle")}>
            카테고리 목록과 해당 글 목록이 표시됩니다.
          </h4>
          <div className={cx("categories-wrap-list", { "categories-delete": editMode })}>
            {categoryPosts.map((categoryPost, idx) => (
              <React.Fragment key={idx}>
                <CategoryItem
                  categoryPost={categoryPost}
                  categoryLength={categoryPosts.length}
                  editMode={editMode}
                  editModeHandler={editModeHandler}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Categories;
