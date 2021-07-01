import React, { FC } from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import IUser from "types/user.type";

const styles = require("./HeaderMenuProfile.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HeaderMenuProfileProps = {
  profile: IUser;
};

const HeaderMenuProfile: FC<HeaderMenuProfileProps> = ({ profile }) => {
  const { avatar, name, bio } = profile;

  return (
    <div className={cx("header-menu-profile")}>
      <img src={avatar} alt={avatar} className={cx("header-menu-profile-avatar")} />
      <div className={cx("header-menu-profile-info")}>
        <h3 className={cx("header-menu-profile-info-name")}>{name}</h3>
        <p className={cx("header-menu-profile-info-bio")}>{bio}</p>
      </div>
    </div>
  );
};

export default HeaderMenuProfile;
