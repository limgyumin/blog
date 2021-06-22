import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

const styles = require("./HeaderSearch.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const HeaderSearch = () => {
  return (
    <Link to="/search" className={cx("header-search")}>
      <BsSearch />
    </Link>
  );
};

export default HeaderSearch;
