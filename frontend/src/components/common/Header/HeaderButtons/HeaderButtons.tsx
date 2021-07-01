import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import useTheme from "hooks/util/useTheme";
import React, { FC } from "react";
import { FiMenu, FiMoon, FiSearch, FiSun } from "react-icons/fi";
import { Link } from "react-router-dom";

const styles = require("./HeaderButtons.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HeaderButtonsProps = {
  isDesktop: any;
  onClick: () => void;
};

const HeaderButtons: FC<HeaderButtonsProps> = ({ isDesktop, onClick }) => {
  const { isLight, handleChangeTheme } = useTheme();

  return (
    <div className={cx("header-buttons")}>
      <Link to="/search" className={cx("header-buttons-item")}>
        <FiSearch />
      </Link>
      <div className={cx("header-buttons-item")} onClick={handleChangeTheme}>
        {isLight ? <FiMoon /> : <FiSun />}
      </div>
      {!isDesktop && (
        <div className={cx("header-buttons-item")} onClick={onClick}>
          <FiMenu />
        </div>
      )}
    </div>
  );
};

export default HeaderButtons;
