import React from "react";
import { WiMoonAltNew } from "react-icons/wi";
import { IoMdMoon } from "react-icons/io";
import useTheme from "hooks/util/useTheme";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import ETheme from "enum/theme.enum";

const styles = require("./SideBarThemeButton.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const SideBarThemeButton = () => {
  const { theme, onChangeTheme } = useTheme();

  const isLight = theme === ETheme.LIGHT;

  return (
    <div className={cx("sidebar-theme-button")} onClick={onChangeTheme}>
      <div className={cx("sidebar-theme-button-toggle", { "toggle-dark": isLight })}>
        {isLight ? <IoMdMoon /> : <WiMoonAltNew />}
      </div>
    </div>
  );
};

export default SideBarThemeButton;
