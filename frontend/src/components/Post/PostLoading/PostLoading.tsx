import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React from "react";

const styles = require("./PostLoading.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const PostLoading = () => {
  return (
    <div className={cx("post-loading")}>
      <div className={cx("post-loading-wrap")}>
        <div className={cx("post-loading-wrap-title")}>
          <span />
          <span style={{ width: "16rem" }} />
          <span />
          <span style={{ width: "4rem" }} />
          <span style={{ width: "10rem" }} />
        </div>
        <div className={cx("post-loading-wrap-category")}>
          <span />
          <span />
          <span style={{ width: "10rem" }} />
          <span style={{ width: "5rem" }} />
        </div>
      </div>
      <span className={cx("post-loading-thumbnail")} />
      <div className={cx("post-loading-container")}>
        <div className={cx("post-loading-container-content")}>
          <span style={{ width: "10rem" }} />
          <span style={{ width: "5rem" }} />
          <span style={{ width: "8rem" }} />
          <span style={{ width: "9rem" }} />
          <span style={{ width: "5rem" }} />
          <span style={{ width: "5rem" }} />
          <span style={{ width: "14rem" }} />
          <span style={{ width: "3rem" }} />
          <span style={{ width: "7rem" }} />
          <span style={{ width: "4rem" }} />
          <span style={{ width: "5rem" }} />
          <span style={{ width: "8rem" }} />
          <span style={{ width: "5rem" }} />
          <span style={{ width: "7rem" }} />
          <span style={{ width: "5rem" }} />
          <span style={{ width: "7rem" }} />
          <span style={{ width: "5rem" }} />
          <span style={{ width: "5rem" }} />
          <span style={{ width: "9rem" }} />
        </div>
        <div className={cx("post-loading-container-content")}>
          <span style={{ width: "10rem" }} />
          <span style={{ width: "5rem" }} />
          <span style={{ width: "8rem" }} />
          <span style={{ width: "9rem" }} />
          <span style={{ width: "5rem" }} />
          <span style={{ width: "5rem" }} />
          <span style={{ width: "14rem" }} />
          <span style={{ width: "3rem" }} />
          <span style={{ width: "7rem" }} />
          <span style={{ width: "4rem" }} />
          <span style={{ width: "5rem" }} />
          <span style={{ width: "8rem" }} />
          <span style={{ width: "5rem" }} />
          <span style={{ width: "7rem" }} />
          <span style={{ width: "5rem" }} />
          <span style={{ width: "7rem" }} />
          <span style={{ width: "5rem" }} />
          <span style={{ width: "5rem" }} />
          <span style={{ width: "9rem" }} />
        </div>
      </div>
    </div>
  );
};

export default PostLoading;
