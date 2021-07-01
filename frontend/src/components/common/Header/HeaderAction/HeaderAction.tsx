import React from "react";
import { OAUTH } from "config/config.json";
import { AiFillGithub } from "react-icons/ai";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./HeaderAction.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const HeaderAction = () => {
  return (
    <a href={OAUTH} className={cx("header-action")}>
      <AiFillGithub className={cx("header-action-icon")} />
    </a>
  );
};

export default HeaderAction;
