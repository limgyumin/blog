import React, { FC, useState } from "react";
import Modal from "components/common/Modal";
import useCategory from "hooks/category/useCategory";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { ICategoryPosts } from "types/category.type";
import CategoryPostItem from "../CategoryPostItem";
import CategoryDelete from "../CategoryDelete";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./CategoryItem.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type CategoryItemProps = {
  categoryPost: ICategoryPosts;
  categoryLength: number;
  editMode: boolean;
  editModeHandler: () => void;
};

const CategoryItem: FC<CategoryItemProps> = ({
  categoryPost,
  categoryLength,
  editMode,
  editModeHandler,
}) => {
  const {
    categoryName,
    isMount,
    updateMode,
    onMount,
    onDeleteConfirmHandler,
    onCategoryChange,
    onUpdateCategoryKeyDown,
    onUpdateHandler,
    onDeleteHandler,
  } = useCategory(categoryPost);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <React.Fragment>
      <Modal isMount={isMount}>
        <CategoryDelete onDelete={onDeleteConfirmHandler} onCancel={onMount} />
      </Modal>
      <div className={cx("category-item")}>
        <div
          className={cx("category-item-info")}
          onClick={() => {
            !editMode && setOpen((prev) => !prev);
          }}
        >
          <div className={cx("category-item-info-wrap")}>
            {open ? <FaFolderOpen /> : <FaFolder />}
            {updateMode ? (
              <div className={cx("category-item-info-wrap-edit")}>
                <input
                  value={categoryName}
                  type="text"
                  placeholder="카테고리 이름 입력."
                  className={cx("category-item-info-wrap-edit-input")}
                  onChange={(e) => onCategoryChange(e)}
                  onKeyDown={(e) => onUpdateCategoryKeyDown(e)}
                />
                <RiDeleteBack2Fill
                  onClick={() => {
                    editMode && editModeHandler();
                  }}
                />
              </div>
            ) : (
              <p
                className={cx("category-item-info-wrap-name")}
                onClick={() => {
                  editMode && onUpdateHandler(categoryPost.idx);
                }}
              >
                {categoryPost.name}
              </p>
            )}
            <p className={cx("category-item-info-wrap-count")}>{categoryPost.post_count} posts</p>
          </div>
          {editMode ? (
            categoryLength > 1 && (
              <MdCancel
                className={cx("category-item-info-icon")}
                onClick={() => onDeleteHandler(categoryPost.idx)}
              />
            )
          ) : (
            <IoIosArrowDown
              className={cx("category-item-info-icon", { "category-item-icon-active": open })}
            />
          )}
        </div>
        <div className={cx("category-item-post", { "category-item-post-active": open })}>
          {categoryPost.posts.map((post, idx) => (
            <React.Fragment key={idx}>
              <CategoryPostItem post={post} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CategoryItem;
