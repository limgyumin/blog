import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React from "react";
import { ReactComponent as Sign } from "../../../assets/images/not_found.svg";

const styles = require("./PostNotFound.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const PostNotFound = () => {
  return (
    <div className={cx("post-notfound")}>
      <Sign className={cx("Post-notfound-sign")} />
      <div className={cx("Post-notfound-wrap")}>
        <div className={cx("Post-notfound-wrap-image")}></div>
        <p className={cx("Post-notfound-wrap-title")}>잠깐, 정말 이 주소가 맞나요?</p>
        <p className={cx("Post-notfound-wrap-subtitle")}>
          아닌 것 같은데용..
          <span role="img" aria-label="person" aria-labelledby="person">
            😅
          </span>
        </p>
      </div>
    </div>
  );
};

export default PostNotFound;
