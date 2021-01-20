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
        <a
          href={`https://github.com/${user.id}`}
          target="_blank"
          className="Members-User-Item-Container"
        >
          <div className="Members-User-Item-Container-Wrapper">
            <img
              className="Members-User-Item-Container-Wrapper-Avatar"
              src={user.avatar}
              alt={user.avatar}
            />
            <div className="Members-User-Item-Container-Wrapper-Info">
              <p className="Members-User-Item-Container-Wrapper-Info-Name">
                {user.name}
              </p>
              <p className="Members-User-Item-Container-Wrapper-Info-Bio">
                {user.bio}
              </p>
            </div>
          </div>
        </a>
        <p className="Members-User-Item-CreatedAt">
          {getDateFormat(user.created_at!)}
        </p>
      </div>
    </>
  );
};

export default MembersUserItem;
