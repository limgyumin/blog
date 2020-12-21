import React from "react";
import "./SideBar.scss";

interface SideBarProps {
  avatar: string;
  id: string;
  name: string;
  bio: string;
}

const SideBar = ({ avatar, id, name, bio }: SideBarProps) => {
  return (
    <>
      <div className="SideBar">
        <div className="SideBar-Profile">
          <img className="SideBar-Profile-Avatar" src={avatar} alt="admin" />
          <p className="SideBar-Profile-Name">
            {id}({name})
          </p>
          <p className="SideBar-Profile-Bio">{bio}</p>
        </div>
      </div>
    </>
  );
};

export default SideBar;
