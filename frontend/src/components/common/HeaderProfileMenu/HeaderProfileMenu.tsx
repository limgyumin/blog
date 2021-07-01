import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React, { FC } from "react";
import { FaSave } from "react-icons/fa";
import { ImExit } from "react-icons/im";

const styles = require("./HeaderProfileMenu.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HeaderProfileMenuProps = {
  clickEl: React.MutableRefObject<HTMLDivElement>;
  admin: boolean;
  onClickTemp: () => void;
  onClickLogout: () => void;
};

const HeaderProfileMenu: FC<HeaderProfileMenuProps> = ({
  clickEl,
  admin,
  onClickTemp,
  onClickLogout,
}) => {
  return (
    <div className={cx("header-profile-menu")} ref={clickEl}>
      {admin && (
        <div className={cx("header-profile-menu-temp")} onClick={onClickTemp}>
          <div className={cx("header-profile-menu-temp-wrap")}>
            <FaSave />
          </div>
          <span className={cx("header-profile-menu-temp-text")}>임시 글</span>
        </div>
      )}
      <div className={cx("header-profile-menu-logout")} onClick={onClickLogout}>
        <div className={cx("header-profile-menu-logout-wrap")}>
          <ImExit />
        </div>
        <span className={cx("header-profile-menu-logout-text")}>로그아웃</span>
      </div>
    </div>
  );
};

export default HeaderProfileMenu;
