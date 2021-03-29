import React from "react";
import { BiBook } from "react-icons/bi";
import { RiHome3Line, RiMacbookLine } from "react-icons/ri";
import { HiOutlineInformationCircle } from "react-icons/hi";
import "./SideBarTap.scss";
import { Link } from "react-router-dom";

interface SideBarTapProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBarTap = ({ setOpen }: SideBarTapProps) => {
  return (
    <>
      <div className="SideBar-Tap">
        <Link
          to="/"
          className="SideBar-Tap-Home"
          onClick={() => setOpen(false)}
        >
          <div className="SideBar-Tap-Home-Wrapper">
            <div className="SideBar-Tap-Home-Wrapper-Area">
              <RiHome3Line />
            </div>
            <p>HOME</p>
          </div>
        </Link>
        <Link
          to="/categories"
          className="SideBar-Tap-Categories"
          onClick={() => setOpen(false)}
        >
          <div className="SideBar-Tap-Categories-Wrapper">
            <div className="SideBar-Tap-Categories-Wrapper-Area">
              <BiBook />
            </div>
            <p>CATEGORIES</p>
          </div>
        </Link>
        <Link
          to="/members"
          className="SideBar-Tap-Achieve"
          onClick={() => setOpen(false)}
        >
          <div className="SideBar-Tap-Achieve-Wrapper">
            <div className="SideBar-Tap-Achieve-Wrapper-Area">
              <RiMacbookLine />
            </div>
            <p>MEMBERS</p>
          </div>
        </Link>
        <Link
          to="/about/info"
          className="SideBar-Tap-About"
          onClick={() => setOpen(false)}
        >
          <div className="SideBar-Tap-About-Wrapper">
            <div className="SideBar-Tap-About-Wrapper-Area">
              <HiOutlineInformationCircle />
            </div>
            <p>ABOUT</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default SideBarTap;
