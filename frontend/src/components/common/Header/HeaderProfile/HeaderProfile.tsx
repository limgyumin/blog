import React, { FC } from "react";
import IUser from "types/user.type";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./HeaderProfile.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HeaderProfileProps = {
  children: React.ReactNode;
  menuEl: React.MutableRefObject<HTMLDivElement>;
  admin: boolean;
  profile: IUser;
  showMenu: boolean;
  showMenuHandler: () => void;
};

const HeaderProfile: FC<HeaderProfileProps> = ({
  children,
  menuEl,
  admin,
  profile,
  showMenu,
  showMenuHandler,
}) => {
  return (
    <div className={cx("header-profile")}>
      <div className={cx("header-profile-user")} onClick={showMenuHandler} ref={menuEl}>
        <img src={profile.avatar} alt="Profile" className={cx("header-profile-user-avatar")} />
      </div>
      {admin && (
        <React.Fragment>
          <div className={cx("header-profile-divide")} />
          <Link to="/write" className={cx("header-profile-write")}>
            글 쓰기
          </Link>
        </React.Fragment>
      )}
      {showMenu && children}
    </div>
  );
};

export default HeaderProfile;
