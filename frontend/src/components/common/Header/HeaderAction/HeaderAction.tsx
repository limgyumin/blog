import React from "react";
import { OAUTH } from "config/config.json";
import { ReactComponent as GitHub } from "assets/images/github_logo.svg";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./HeaderAction.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const HeaderAction = () => {
  return (
    <a href={OAUTH} className={cx("header-action")}>
      <GitHub className={cx("header-action-logo")} />
    </a>
  );
};

export default HeaderAction;
