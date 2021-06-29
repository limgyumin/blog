import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React, { FC } from "react";
import { FaSave } from "react-icons/fa";
import { ImExit } from "react-icons/im";

const styles = require("./HeaderOption.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HeaderOptionProps = {
  clickEl: React.MutableRefObject<HTMLDivElement>;
  admin: boolean;
  onClickTemp: () => void;
  onClickLogout: () => void;
};

const HeaderOption: FC<HeaderOptionProps> = ({ clickEl, admin, onClickTemp, onClickLogout }) => {
  return (
    <div className={cx("header-option")} ref={clickEl}>
      {admin && (
        <div className={cx("header-option-temp")} onClick={onClickTemp}>
          <div className={cx("header-option-temp-wrap")}>
            <FaSave />
          </div>
          <span className={cx("header-option-temp-text")}>임시 글</span>
        </div>
      )}
      <div className={cx("header-option-logout")} onClick={onClickLogout}>
        <div className={cx("header-option-logout-wrap")}>
          <ImExit />
        </div>
        <span className={cx("header-option-logout-text")}>로그아웃</span>
      </div>
    </div>
  );
};

export default HeaderOption;
