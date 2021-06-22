import React from "react";
import { ReactComponent as Paper } from "assets/images/paper.svg";
import { ReactComponent as Shadow } from "assets/images/shadow.svg";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./MainPostNotFound.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const MainPostNotFound = () => {
  return (
    <div className={cx("main-post-notfound")}>
      <Paper className={cx("main-post-notfound-picture")} />
      <div className={cx("main-post-notfound-wrap")}>
        <div className={cx("main-post-notfound-wrap-image")}>
          <Shadow className={cx("main-post-notfound-wrap-image-shadow")} />
        </div>
        <p className={cx("main-post-notfound-wrap-title")}>으음.. 아무것도 없네요.</p>
        <p className={cx("main-post-notfound-wrap-subtitle")}>
          아마 곧 생기지 않을까요?..{" "}
          <span role="img" aria-label="person" aria-labelledby="person">
            🤔
          </span>
        </p>
      </div>
    </div>
  );
};

export default MainPostNotFound;
