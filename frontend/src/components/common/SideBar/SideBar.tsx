import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import useFetchAdminProfile from "hooks/user/useFetchAdminProfile";
import { IoIosArrowDown } from "react-icons/io";
import SideBarContent from "./SideBarContent";
import SideBarMenu from "./SideBarMenu";
import SideBarThemeButton from "./SideBarThemeButton";
import { memo } from "react";

const styles = require("./SideBar.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const SideBar = () => {
  const { adminProfile } = useFetchAdminProfile();

  return (
    <React.Fragment>
      <div className={cx("toggle")}>
        <IoIosArrowDown className={cx("toggle-icon")} />
        <span className={cx("toggle-text")}>Information</span>
      </div>
      <nav className={cx("sidebar")}>
        <SideBarContent adminProfile={adminProfile} />
        <div className={cx("sidebar-bottom")}>
          <SideBarThemeButton />
        </div>
        <SideBarMenu />
      </nav>
    </React.Fragment>
  );
};

export default memo(SideBar);
