import React, { useState } from "react";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { CategoryPostsType } from "../../../util/types/Category";
import CategoriesPostsListItem from "../CategoriesPostsListItem";
import "./CategoriesListItem.scss";

interface CategoriesListItemProps {
  categoryPost: CategoryPostsType;
  editMode: boolean;
  modifyCategoryHandler: (idx: number) => void;
  deleteCategoryHandler: (idx: number) => void;
  modifyMode: boolean;
  setModifyMode: React.Dispatch<React.SetStateAction<boolean>>;
  keyDownListener: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  categoryName: string;
  setCategoryName: React.Dispatch<React.SetStateAction<string>>;
  categoryLength: number;
}

const CategoriesListItem = ({
  categoryPost,
  editMode,
  modifyCategoryHandler,
  deleteCategoryHandler,
  modifyMode,
  setModifyMode,
  keyDownListener,
  categoryName,
  setCategoryName,
  categoryLength,
}: CategoriesListItemProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="Categories-List-Item">
        <div
          className="Categories-List-Item-Info"
          onClick={() => {
            !editMode && setOpen((prev) => !prev);
          }}
        >
          <div className="Categories-List-Item-Info-Wrapper">
            {open ? <FaFolderOpen /> : <FaFolder />}
            {modifyMode ? (
              <div className="Categories-List-Item-Info-Wrapper-Edit">
                <input
                  value={categoryName}
                  type="text"
                  placeholder="카테고리 이름 입력."
                  className="Categories-List-Item-Info-Wrapper-Edit-Input"
                  onChange={(e) => setCategoryName(e.target.value)}
                  onKeyDown={(e) => keyDownListener(e)}
                />
                <RiDeleteBack2Fill
                  onClick={() => {
                    editMode && setModifyMode((prev) => !prev);
                  }}
                />
              </div>
            ) : (
              <p
                className="Categories-List-Item-Info-Wrapper-Name"
                onClick={() => {
                  editMode && modifyCategoryHandler(categoryPost.idx);
                }}
              >
                {categoryPost.name}
              </p>
            )}
            <p className="Categories-List-Item-Info-Wrapper-Count">
              {categoryPost.post_count} posts
            </p>
          </div>
          {editMode ? (
            categoryLength > 1 && (
              <MdCancel
                className="Categories-List-Item-Info-Icon"
                onClick={() => deleteCategoryHandler(categoryPost.idx)}
              />
            )
          ) : (
            <IoIosArrowDown
              className={
                open
                  ? "Categories-List-Item-Info-Icon-Active Categories-List-Item-Info-Icon"
                  : "Categories-List-Item-Info-Icon"
              }
            />
          )}
        </div>
        <div
          className={
            open
              ? "Categories-List-Item-Post-Active Categories-List-Item-Post"
              : "Categories-List-Item-Post"
          }
        >
          {categoryPost.posts.map((post, idx) => (
            <React.Fragment key={idx}>
              <CategoriesPostsListItem post={post} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoriesListItem;
