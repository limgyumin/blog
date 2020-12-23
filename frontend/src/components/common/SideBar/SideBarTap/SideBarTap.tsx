import React from "react";
import { BiBook } from "react-icons/bi";
import { RiHome3Line, RiMacbookLine } from "react-icons/ri";
import { HiOutlineInformationCircle } from "react-icons/hi";
import "./SideBarTap.scss";
import { Link } from "react-router-dom";

interface SideBarTapProps {}

const SideBarTap = ({}: SideBarTapProps) => {
  return (
    <>
      <div className="SideBar-Tap">
        <Link to="/" className="SideBar-Tap-Home">
          <RiHome3Line />
          <p>HOME</p>
        </Link>
        <Link to="/categories" className="SideBar-Tap-Categories">
          <BiBook />
          <p>CATEGORIES</p>
        </Link>
        <div className="SideBar-Tap-Achieve">
          <RiMacbookLine />
          <p>ACHIEVE</p>
        </div>
        <div className="SideBar-Tap-About">
          <HiOutlineInformationCircle />
          <p>ABOUT</p>
        </div>
      </div>
    </>
  );
};

export default SideBarTap;
