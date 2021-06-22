import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import useTheme from "hooks/util/useTheme";
import React, { FC } from "react";
import DelayUnmount from "../DelayUnmount";
import "./Modal.scss";

type ModalProps = {
  isMount: boolean;
  children: React.ReactNode;
};

const styles = require("./Modal.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const Modal: FC<ModalProps> = ({ isMount, children }) => {
  const { isLight } = useTheme();

  return (
    <DelayUnmount delay={500} isMount={isMount}>
      <div className={cx("modal", { light: isLight, dark: !isLight })}>
        <div
          className={cx("modal-overlay", { "overlay-active": isMount, "overlay-leave": !isMount })}
        />
        <div className={cx("modal-box", { "box-active": isMount, "box-leave": !isMount })}>
          {children}
        </div>
      </div>
    </DelayUnmount>
  );
};

export default Modal;
