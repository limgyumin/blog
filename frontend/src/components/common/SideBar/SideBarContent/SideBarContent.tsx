import React, { FC } from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import IUser from "types/user.type";

const styles = require("./SideBarContent.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type SideBarContentProps = {
  adminProfile: IUser;
};

const SideBarContent: FC<SideBarContentProps> = ({ adminProfile }) => {
  const { avatar, id, name, bio } = adminProfile;

  return (
    <div className={cx("sidebar-content")}>
      <a
        href={`https://github.com/${id}`}
        target="_blank"
        className={cx("sidebar-content-avatar")}
        rel="noopener noreferrer"
      >
        <img className={cx("sidebar-content-avatar-img")} src={avatar} alt="admin" />
      </a>
      <div className={cx("sidebar-content-name")}>
        <a
          href={`https://github.com/${id}`}
          target="_blank"
          className={cx("sidebar-content-name-wrap")}
          rel="noopener noreferrer"
        >
          <p className={cx("sidebar-content-name-wrap-text")}>{name}</p>
        </a>
      </div>
      <p className={cx("sidebar-content-id")}>{id}</p>
      <p className={cx("sidebar-content-bio")}>{bio}</p>
    </div>
  );
};

export default SideBarContent;
