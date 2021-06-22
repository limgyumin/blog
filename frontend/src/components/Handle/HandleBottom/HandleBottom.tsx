import React, { FC } from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { FiArrowLeft } from "react-icons/fi";

const styles = require("./HandleBottom.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HandleBottomProps = {
  valid: boolean;
  onCancel: () => void;
  onSave: () => void;
  onComplete: () => void;
};

const HandleBottom: FC<HandleBottomProps> = ({ valid, onCancel, onSave, onComplete }) => {
  return (
    <div className={cx("handle-bottom")}>
      <div className={cx("handle-bottom-buttons")}>
        <button className={cx("handle-bottom-buttons-cancel")} onClick={onCancel}>
          <FiArrowLeft className={cx("handle-bottom-buttons-cancel-icon")} />
        </button>
        <button
          className={cx("handle-bottom-buttons-save", {
            "button-disable": !valid,
          })}
          onClick={onSave}
          disabled={!valid}
        >
          <p className={cx("handle-bottom-buttons-save-text")}>임시저장</p>
        </button>
        <button
          className={cx("handle-bottom-buttons-submit", {
            "button-disable": !valid,
          })}
          onClick={onComplete}
          disabled={!valid}
        >
          <p className={cx("handle-bottom-buttons-submit-text")}>작성하기</p>
        </button>
      </div>
    </div>
  );
};

export default HandleBottom;
