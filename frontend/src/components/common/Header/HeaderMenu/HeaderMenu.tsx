import React, { FC } from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import IUser from "types/user.type";
import { Link } from "react-router-dom";
import { headerMenuTabModel } from "components/models/headerMenuTabModel";
import HeaderMenuProfile from "./HeaderMenuProfile";
import HeaderMenuLogin from "./HeaderMenuLogin";
import HeaderMenuTop from "./HeaderMenuTop";

const styles = require("./HeaderMenu.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HeaderMenuProps = {
  login: boolean;
  admin: boolean;
  profile: IUser;
  onClickTemp: () => void;
  onClickLogout: () => void;
  onClose: () => void;
};

const HeaderMenu: FC<HeaderMenuProps> = ({
  login,
  admin,
  profile,
  onClickTemp,
  onClickLogout,
  onClose,
}) => {
  return (
    <div className={cx("header-menu")}>
      <div className={cx("header-menu-wrap")}>
        <HeaderMenuTop onClose={onClose} />
        <div className={cx("header-menu-wrap-container")}>
          {login ? <HeaderMenuProfile profile={profile} /> : <HeaderMenuLogin />}
        </div>
        <div className={cx("header-menu-wrap-content")}>
          {login && admin && (
            <div className={cx("header-menu-wrap-content-restrict")}>
              <div className={cx("header-menu-wrap-content-item")} onClick={onClickTemp}>
                임시 글
              </div>
              <Link to="/write" className={cx("header-menu-wrap-content-item")}>
                글 쓰기
              </Link>
            </div>
          )}
          {headerMenuTabModel.map((tabMenu, idx) => (
            <Link
              key={idx}
              to={tabMenu.path}
              className={cx("header-menu-wrap-content-item")}
              onClick={onClose}
            >
              {tabMenu.label}
            </Link>
          ))}
          {login && (
            <div className={cx("header-menu-wrap-content-logout")} onClick={onClickLogout}>
              로그아웃
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
