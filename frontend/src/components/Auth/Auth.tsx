import React, { memo } from "react";
import useGitHubAuth from "hooks/auth/useGitHubAuth";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import useTheme from "hooks/util/useTheme";
import { WaveSpinner } from "react-spinners-kit";

const styles = require("./Auth.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const Auth = () => {
  const { isLight } = useTheme();
  useGitHubAuth();

  return (
    <div className={cx("auth")}>
      <div className={cx("auth-container")}>
        <p className={cx("auth-container-title")}>로그인을 처리하는 중이에요!</p>
        <p className={cx("auth-container-subtitle")}>
          조금만 기다려주세용...
          <span role="img" aria-label="person" aria-labelledby="person">
            🤤
          </span>
        </p>
        <WaveSpinner size={50} color={isLight ? "#c1c1c1" : "#b3b3b3"} />
      </div>
    </div>
  );
};

export default memo(Auth);
