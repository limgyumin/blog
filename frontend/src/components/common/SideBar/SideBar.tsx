import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import "./SideBar.scss";
import SideBarTap from "./SideBarTap";
import SideBarThemeButton from "./SideBarThemeButton";

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
      {open && <div className="SideBar-Close" onClick={() => setOpen(false)} />}
      <nav
        className={open ? "SideBar-Active SideBar" : "SideBar"}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="SideBar-Content">
          <a
            href={`https://github.com/${id}`}
            target="_blank"
            className="SideBar-Content-Avatar"
          >
            <img
              className="SideBar-Content-Avatar-Img"
              src={avatar}
              alt="admin"
            />
          </a>
          <div className="SideBar-Content-Name">
            <a
              href={`https://github.com/${id}`}
              target="_blank"
              className="SideBar-Content-Name-Wrapper"
            >
              <p className="SideBar-Content-Name-Wrapper-Text">{name}</p>
            </a>
          </div>
          <p className="SideBar-Content-Id">{id}</p>
          <p className="SideBar-Content-Bio">{bio}</p>
        </div>
        <div className="SideBar-Bottom">
          <SideBarThemeButton />
        </div>
        <SideBarTap />
      </nav>
      <div
        className={open ? "Toggle-Active Toggle" : "Toggle"}
        onMouseEnter={() => setOpen(true)}
        onClick={() => setOpen(true)}
      >
        <IoIosArrowDown className="Toggle-Icon" />
        <span className="Toggle-Text">Information</span>
      </div>
    </>
  );
};

export default SideBar;
