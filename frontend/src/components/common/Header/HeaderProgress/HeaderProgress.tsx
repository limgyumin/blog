import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React, { FC } from "react";

const styles = require("./HeaderProgress.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HeaderProgressProps = {
  scroll: number;
};

const HeaderProgress: FC<HeaderProgressProps> = ({ scroll }) => {
  return (
    <div className={cx("header-progress")}>
      <div
        className={cx("header-progress-container")}
        style={{ transform: `scale(${scroll}, 1)` }}
      />
    </div>
  );
};

export default HeaderProgress;
