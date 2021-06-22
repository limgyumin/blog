import React, { FC } from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./CategoryDelete.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type CategoryDeleteProps = {
  onDelete: () => void;
  onCancel: () => void;
};

const CategoryDelete: FC<CategoryDeleteProps> = ({ onDelete, onCancel }) => {
  return (
    <div className={cx("category-delete")}>
      <div className={cx("category-delete-content")}>
        <h2>카테고리 삭제</h2>
        <p>
          카테고리가 삭제되면 관련 게시물도 모두 삭제됩니다.
          <br />
          정말로 삭제하시겠어요?
        </p>
      </div>
      <div className={cx("category-delete-button")}>
        <button className={cx("category-delete-button-delete")} onClick={onDelete}>
          삭제
        </button>
        <button className={cx("category-delete-button-cancel")} onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

export default CategoryDelete;
