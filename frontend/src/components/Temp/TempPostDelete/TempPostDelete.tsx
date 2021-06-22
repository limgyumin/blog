import React, { FC } from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./TempPostDelete.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type TempPostDeleteProps = {
  onDelete: () => void;
  onCancel: () => void;
};

const TempPostDelete: FC<TempPostDeleteProps> = ({ onDelete, onCancel }) => {
  return (
    <div className={cx("temp-post-delete")}>
      <div className={cx("temp-post-delete-content")}>
        <h2>임시 글 삭제</h2>
        <p>정말로 임시 글을 삭제하시겠어요?</p>
      </div>
      <div className={cx("temp-post-delete-button")}>
        <button className={cx("temp-post-delete-button-delete")} onClick={onDelete}>
          삭제
        </button>
        <button className={cx("temp-post-delete-button-cancel")} onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

export default TempPostDelete;
