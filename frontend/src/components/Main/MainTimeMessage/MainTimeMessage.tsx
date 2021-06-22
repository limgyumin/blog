import React from "react";
import timeMessage from "lib/timeMessage";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./MainTimeMessage.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const MainTimeMessage = () => {
  return (
    <div className={cx("main-time-message")}>
      <p className={cx("main-time-message-content")}>{timeMessage()}</p>
    </div>
  );
};

export default MainTimeMessage;
