import React from "react";
import "./SideBar.scss";
import SideBarTap from "./SideBarTap";

interface SideBarProps {
  avatar: string;
  id: string;
  name: string;
  bio: string;
}

const SideBar = ({ avatar, id, name, bio }: SideBarProps) => {
  return (
    <>
      <nav className="SideBar">
        <div className="SideBar-Content">
          <img className="SideBar-Content-Avatar" src={avatar} alt="admin" />
          <p className="SideBar-Content-Name">{name}</p>
          <p className="SideBar-Content-Id">{id}</p>
          <p className="SideBar-Content-Bio">{bio}</p>
        </div>
        <SideBarTap />
      </nav>
    </>
  );
};

export default SideBar;
