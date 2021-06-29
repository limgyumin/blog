import React, { FC } from "react";
import { BiBook } from "react-icons/bi";
import { RiHome3Line, RiMacbookLine } from "react-icons/ri";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./SideBarMenu.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const SideBarMenu: FC = () => {
  return (
    <div className={cx("sidebar-menu")}>
      <Link to="/" className={cx("sidebar-menu-home")}>
        <div className={cx("sidebar-menu-home-wrap")}>
          <div className={cx("sidebar-menu-home-wrap-area")}>
            <RiHome3Line />
          </div>
          <p>HOME</p>
        </div>
      </Link>
      <Link to="/categories" className={cx("sidebar-menu-categories")}>
        <div className={cx("sidebar-menu-categories-wrap")}>
          <div className={cx("sidebar-menu-categories-wrap-area")}>
            <BiBook />
          </div>
          <p>CATEGORIES</p>
        </div>
      </Link>
      <Link to="/members" className={cx("sidebar-menu-members")}>
        <div className={cx("sidebar-menu-members-wrap")}>
          <div className={cx("sidebar-menu-members-wrap-area")}>
            <RiMacbookLine />
          </div>
          <p>MEMBERS</p>
        </div>
      </Link>
      <Link to="/about/info" className={cx("sidebar-menu-about")}>
        <div className={cx("sidebar-menu-about-wrap")}>
          <div className={cx("sidebar-menu-about-wrap-area")}>
            <HiOutlineInformationCircle />
          </div>
          <p>ABOUT</p>
        </div>
      </Link>
    </div>
  );
};

export default SideBarMenu;
