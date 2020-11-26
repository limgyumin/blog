import React, { useEffect } from "react";
import "./HeaderOption.scss";

interface HeaderOptionProps {
  admin: boolean;
  closeOption: (e: any) => void;
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
        <div className="Header-Option-MyProfile">
          <span className="Header-Option-MyProfile-Text">내 프로필</span>
        </div>
        <div className="Header-Option-ReadList">
          <span className="Header-Option-ReadList-Text">읽기 목록</span>
        </div>
        {admin && (
          <div className="Header-Option-TempList">
            <span className="Header-Option-TempList-Text">임시 글</span>
          </div>
        )}
        <div className="Header-Option-Logout" onClick={() => handleLogout()}>
          <span className="Header-Option-Logout-Text">로그아웃</span>
        </div>
      </div>
    </>
  );
};

export default HeaderOption;
