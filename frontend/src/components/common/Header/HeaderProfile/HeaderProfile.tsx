import React, { FC } from "react";
import IUser from "types/user.type";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./HeaderProfile.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HeaderProfileProps = {
  menuEl: React.MutableRefObject<HTMLDivElement>;
  admin: boolean;
  profile: IUser;
  showMenu: boolean;
  onClick: () => void;
};

const HeaderProfile: FC<HeaderProfileProps> = ({ menuEl, admin, profile, showMenu, onClick }) => {
  return (
    <div className={cx("header-profile")}>
      <div className={cx("header-profile-user")} onClick={onClick} ref={menuEl}>
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
    </div>
  );
};

export default HeaderProfile;
