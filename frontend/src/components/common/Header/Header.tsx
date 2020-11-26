import React from "react";
import "./Header.scss";
import { ReactComponent as Logo } from "../../../assets/images/logo.svg";
import { ReactComponent as GitHub } from "../../../assets/images/github_logo.svg";
import { ReactComponent as Option } from "../../../assets/images/option.svg";
import { OAUTH } from "../../../config/config.json";
import { Link } from "react-router-dom";
import UserType from "../../../util/types/User";
import HeaderOption from "./HeaderOption";

interface HeaderProps {
  shadow: boolean;
  hide: boolean;
  admin: boolean;
  login: boolean;
  user?: UserType;
  showOption: boolean;
  setShowOption: React.Dispatch<React.SetStateAction<boolean>>;
  closeOption: (e: any) => void;
  handleLogout: () => void;
}

const Header = ({
  shadow,
  hide,
  admin,
  login,
  user,
  showOption,
  setShowOption,
  closeOption,
  handleLogout,
}: HeaderProps) => {
  return (
    <>
      <div
        className={
          hide
            ? "Header-Hide Header"
            : shadow
            ? "Header-Shadow Header"
            : "Header"
        }
      >
        <div className="Header-Container">
          <Link to="/">
            <Logo className="Header-Container-Image" />
          </Link>
          <div className="Header-Container-Profile">
            {login ? (
              <>
                {admin && (
                  <div className="Header-Container-Profile-Write">글 쓰기</div>
                )}
                <div className="Header-Container-Profile-Wrapper">
                  <div
                    className="Header-Container-Profile-Wrapper-User"
                    onClick={() => setShowOption(true)}
                  >
                    <img
                      src={user?.avatar}
                      alt="Profile"
                      className="Header-Container-Profile-Wrapper-User-Avatar"
                    />
                    <Option className="Header-Container-Profile-Wrapper-User-Option" />
                  </div>
                  {showOption && (
                    <HeaderOption
                      admin={admin}
                      closeOption={closeOption}
                      handleLogout={handleLogout}
                    />
                  )}
                </div>
              </>
            ) : (
              <a href={OAUTH} className="Header-Container-Profile-Button">
                <GitHub className="Header-Container-Profile-Button-Logo" />
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
