import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React, { FC } from "react";
import IUser from "types/user.type";
import getDateFormat from "../../../lib/getDateFormat";

const styles = require("./MembersUserItem.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type MembersUserItemProps = {
  user: IUser;
};

const MembersUserItem: FC<MembersUserItemProps> = ({ user }) => {
  return (
    <div className={cx("members-user-item")}>
      <a
        className={cx("members-user-item-wrap")}
        href={`https://github.com/${user.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={cx("members-user-item-wrap-container")}>
          <img
            className={cx("members-user-item-wrap-container-avatar")}
            src={user.avatar}
            alt={user.avatar}
          />
          <div className={cx("members-user-item-wrap-container-info")}>
            <p className={cx("members-user-item-wrap-container-info-name")}>{user.name}</p>
            <p className={cx("members-user-item-wrap-container-info-bio")}>{user.bio}</p>
          </div>
        </div>
      </a>
      <p className={cx("members-user-item-date")}>{getDateFormat(user.created_at!)}</p>
    </div>
  );
};

export default MembersUserItem;
