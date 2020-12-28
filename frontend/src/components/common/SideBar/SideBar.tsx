import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import "./SideBar.scss";
import SideBarTap from "./SideBarTap";

interface SideBarProps {
  avatar: string;
  id: string;
  name: string;
  bio: string;
}

const SideBar = ({ avatar, id, name, bio }: SideBarProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <nav
        className={open ? "SideBar-Active SideBar" : "SideBar"}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="SideBar-Content">
          <img className="SideBar-Content-Avatar" src={avatar} alt="admin" />
          <p className="SideBar-Content-Name">{name}</p>
          <p className="SideBar-Content-Id">{id}</p>
          <p className="SideBar-Content-Bio">{bio}</p>
        </div>
        <SideBarTap />
      </nav>
      <div
        className={open ? "Toggle-Active Toggle" : "Toggle"}
        onMouseEnter={() => setOpen(true)}
      >
        <IoIosArrowDown className="Toggle-Icon" />
        <span className="Toggle-Text">Information</span>
      </div>
    </>
  );
};

export default SideBar;
