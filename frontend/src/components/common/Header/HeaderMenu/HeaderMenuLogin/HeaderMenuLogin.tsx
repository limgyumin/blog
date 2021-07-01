import React from "react";
import { OAUTH } from "config/config.json";
import { AiFillGithub } from "react-icons/ai";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./HeaderMenuLogin.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const HeaderMenuLogin = () => {
  return (
    <a href={OAUTH} className={cx("header-menu-login")}>
      <AiFillGithub className={cx("header-menu-login-icon")} />
      <p className={cx("header-menu-login-text")}>GitHub로 로그인</p>
    </a>
  );
};

export default HeaderMenuLogin;
