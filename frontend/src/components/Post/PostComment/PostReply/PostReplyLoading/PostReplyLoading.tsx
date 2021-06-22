import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { SwapSpinner } from "react-spinners-kit";
import useTheme from "hooks/util/useTheme";

const styles = require("./PostReplyLoading.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const PostReplyLoading = () => {
  const { isLight } = useTheme();

  return (
    <div className={cx("post-reply-loading")}>
      <SwapSpinner size={40} color={isLight ? "#c1c1c1" : "#b3b3b3"} />
    </div>
  );
};

export default PostReplyLoading;
