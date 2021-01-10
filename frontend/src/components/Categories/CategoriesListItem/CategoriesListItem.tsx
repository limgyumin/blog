import React, { useState } from "react";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { CategoryPostsType } from "../../../util/types/Category";
import CategoriesPostsListItem from "../CategoriesPostsListItem";
import "./CategoriesListItem.scss";

interface CategoriesListItemProps {
  categoryPost: CategoryPostsType;
  deleteMode: boolean;
  deleteCategoryHandler: (idx: number) => void;
}

const CategoriesListItem = ({
  categoryPost,
  deleteMode,
  deleteCategoryHandler,
}: CategoriesListItemProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="Categories-List-Item">
        <div
          className="Categories-List-Item-Info"
          onClick={() => {
            !deleteMode && setOpen((prev) => !prev);
          }}
        >
          <div className="Categories-List-Item-Info-Wrapper">
            {open ? <FaFolderOpen /> : <FaFolder />}
            <p className="Categories-List-Item-Info-Wrapper-Name">
              {categoryPost.name}
            </p>
            <p className="Categories-List-Item-Info-Wrapper-Count">
              {categoryPost.post_count} posts
            </p>
          </div>
          {deleteMode ? (
            <MdCancel
              className="Categories-List-Item-Info-Icon"
              onClick={() => deleteCategoryHandler(categoryPost.idx)}
            />
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
