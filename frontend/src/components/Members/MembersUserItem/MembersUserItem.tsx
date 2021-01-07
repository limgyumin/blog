import React from "react";
import getDateFormat from "../../../util/lib/getDateFormat";
import UserType from "../../../util/types/User";
import "./MembersUserItem.scss";

interface MembersUserItemProps {
  user: UserType | Partial<UserType>;
}

const MembersUserItem = ({ user }: MembersUserItemProps) => {
  return (
    <>
      <div className="Members-User-Item">
        <div className="Members-User-Item-Wrapper">
          <img
            className="Members-User-Item-Wrapper-Avatar"
            src={user.avatar}
            alt={user.avatar}
          />
          <div className="Members-User-Item-Wrapper-Info">
            <p className="Members-User-Item-Wrapper-Info-Name">{user.name}</p>
            <p className="Members-User-Item-Wrapper-Info-Bio">{user.bio}</p>
          </div>
        </div>
        <p className="Members-User-Item-CreatedAt">
          {getDateFormat(user.created_at!)}
        </p>
      </div>
    </>
  );
};

export default MembersUserItem;
