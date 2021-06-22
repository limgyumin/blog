import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React, { FC } from "react";

const styles = require("./HandleTitlePreview.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HandleTitlePreviewProps = {
  title: string;
};

const HandleTitlePreview: FC<HandleTitlePreviewProps> = ({ title }) => {
  return (
    <div className={cx("handle-title-preview")}>
      <p className={cx("handle-title-preview-name")}>제목</p>
      <h1 className={cx("handle-title-preview-text")}>{title}</h1>
    </div>
  );
};

export default HandleTitlePreview;
