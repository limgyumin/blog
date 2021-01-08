import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./HeaderOption.scss";

interface HeaderOptionProps {
  admin: boolean;
  closeOption: () => void;
  handleLogout: () => void;
}

const HeaderOption = ({
  admin,
  closeOption,
  handleLogout,
}: HeaderOptionProps) => {
  useEffect(() => {
    document.addEventListener("click", closeOption);
    return () => document.removeEventListener("click", closeOption);
  }, []);
  return (
    <>
      <div className="Header-Option">
        {admin && (
          <Link to="/temp" className="Header-Option-TempList">
            <span className="Header-Option-TempList-Text">임시 글</span>
          </Link>
        )}
        <div className="Header-Option-Logout" onClick={() => handleLogout()}>
          <span className="Header-Option-Logout-Text">로그아웃</span>
        </div>
      </div>
    </>
  );
};

export default HeaderOption;
