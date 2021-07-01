import React from "react";
import { WiMoonAltNew } from "react-icons/wi";
import { IoMdMoon } from "react-icons/io";
import useTheme from "hooks/util/useTheme";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./ThemeButton.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const ThemeButton = () => {
  const { isLight, handleChangeTheme } = useTheme();

  return (
    <div className={cx("theme-button")} onClick={handleChangeTheme}>
      <div className={cx("theme-button-toggle", { "toggle-dark": isLight })}>
        {isLight ? <IoMdMoon /> : <WiMoonAltNew />}
      </div>
    </div>
  );
};

export default ThemeButton;
