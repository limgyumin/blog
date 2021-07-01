import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { IHeaderMenuTab } from "components/models/headerMenuTabModel";

const styles = require("./HeaderMenuTabItem.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HeaderMenuTabItemProps = {
  tabMenu: IHeaderMenuTab;
};

const HeaderMenuTabItem: FC<HeaderMenuTabItemProps> = ({ tabMenu }) => {
  const { pathname } = useLocation();

  const { label, path } = tabMenu;
  const isMatch = pathname === path;

  return (
    <Link to={path} className={cx("header-menu-tab-item", { "menu-item-active": isMatch })}>
      {label}
    </Link>
  );
};

export default HeaderMenuTabItem;
