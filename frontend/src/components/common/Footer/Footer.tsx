import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React from "react";

const styles = require("./Footer.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const Footer = () => {
  return (
    <footer className={cx("footer")}>
      <div className={cx("footer-wrap")}>
        <p className={cx("footer-wrap-content")}>© 2021. limgyumin. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
