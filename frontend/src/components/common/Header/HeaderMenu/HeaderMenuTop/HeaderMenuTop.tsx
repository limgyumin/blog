import React, { FC } from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { IoMdClose } from "react-icons/io";
import { ReactComponent as LogoBlack } from "assets/images/logo_black.svg";

const styles = require("./HeaderMenuTop.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HeaderMenuTopProps = {
  onClose: () => void;
};

const HeaderMenuTop: FC<HeaderMenuTopProps> = ({ onClose }) => {
  return (
    <div className={cx("header-menu-top")}>
      <LogoBlack className={cx("header-menu-top-logo")} />
      <button className={cx("header-menu-top-close")} onClick={onClose}>
        <IoMdClose className={cx("header-menu-top-close-icon")} />
      </button>
    </div>
  );
};

export default HeaderMenuTop;
