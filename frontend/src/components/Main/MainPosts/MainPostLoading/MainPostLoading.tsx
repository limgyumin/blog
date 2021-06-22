import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { SwapSpinner } from "react-spinners-kit";
import useTheme from "hooks/util/useTheme";
import ETheme from "enum/theme.enum";

const styles = require("./MainPostLoading.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const MainPostLoading = () => {
  const { theme } = useTheme();

  const isLight = ETheme.LIGHT === theme;

  return (
    <div className={cx("main-post-loading")}>
      <SwapSpinner size={80} color={isLight ? "#c1c1c1" : "#b3b3b3"} />
    </div>
  );
};

export default MainPostLoading;
