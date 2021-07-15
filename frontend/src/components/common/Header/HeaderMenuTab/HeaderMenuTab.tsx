import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { headerMenuTabModel } from "models/headerMenuTabModel";
import React from "react";
import { memo } from "react";
import MenuTabItem from "./MenuTabItem";

const styles = require("./HeaderMenuTab.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const HeaderMenuTab = () => {
  return (
    <div className={cx("header-menu-tab")}>
      {headerMenuTabModel.map((tabMenu, idx) => (
        <MenuTabItem key={idx} tabMenu={tabMenu} />
      ))}
    </div>
  );
};

export default memo(HeaderMenuTab);
