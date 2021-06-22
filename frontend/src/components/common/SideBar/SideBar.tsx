import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import useSideBar from "hooks/common/useSideBar";
import useFetchAdminProfile from "hooks/user/useFetchAdminProfile";
import { IoIosArrowDown } from "react-icons/io";
import SideBarContent from "./SideBarContent";
import SideBarMenu from "./SideBarMenu";
import SideBarThemeButton from "./SideBarThemeButton";

const styles = require("./SideBar.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const SideBar = () => {
  const { adminProfile } = useFetchAdminProfile();
  const { open, sideBarOpenHandler } = useSideBar();

  return (
    <React.Fragment>
      {open && <div className={cx("sidebar-close")} onClick={() => sideBarOpenHandler(false)} />}
      <nav
        className={cx("sidebar", { "sidebar-active": open })}
        onMouseEnter={() => sideBarOpenHandler(true)}
        onMouseLeave={() => sideBarOpenHandler(false)}
      >
        <SideBarContent adminProfile={adminProfile} />
        <div className={cx("sidebar-bottom")}>
          <SideBarThemeButton />
        </div>
        <SideBarMenu sideBarOpenHandler={sideBarOpenHandler} />
      </nav>
      <div
        className={cx("toggle", { "toggle-active": open })}
        onMouseEnter={() => sideBarOpenHandler(true)}
        onClick={() => sideBarOpenHandler(true)}
      >
        <IoIosArrowDown className={cx("toggle-icon")} />
        <span className={cx("toggle-text")}>Information</span>
      </div>
    </React.Fragment>
  );
};

export default SideBar;
