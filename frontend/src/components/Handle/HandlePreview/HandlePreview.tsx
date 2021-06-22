import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import MarkDown from "components/common/MarkDown";
import React, { FC } from "react";

const styles = require("./HandlePreview.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HandlePreviewProps = {
  title: string;
  content: string;
};

const HandlePreview: FC<HandlePreviewProps> = ({ title, content }) => {
  return (
    <div className={cx("handle-preview")}>
      <h1 className={cx("handle-preview-title")}>{title}</h1>
      <MarkDown>{content}</MarkDown>
    </div>
  );
};

export default HandlePreview;
