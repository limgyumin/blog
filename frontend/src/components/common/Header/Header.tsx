import React from "react";
import "./Header.scss";
import { ReactComponent as Logo } from "../../../assets/images/logo.svg";
import { ReactComponent as GitHub } from "../../../assets/images/github_logo.svg";
import { ReactComponent as Option } from "../../../assets/images/option.svg";
import { ReactComponent as Arrows } from "../../../assets/images/arrows.svg";
import { OAUTH } from "../../../config/config.json";
import { Link } from "react-router-dom";
import UserType from "../../../util/types/User";
import HeaderOption from "./HeaderOption";

interface HeaderProps {
  shadow: boolean;
  hide: boolean;
  admin: boolean;
  login: boolean;
  user: UserType;
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
          <div className="Header-Container-Content">
            <Link to="/">
              <Logo className="Header-Container-Content-Image" />
            </Link>
            <div className="Header-Container-Content-Profile">
              {login ? (
                <>
                  {admin && (
                    <Link
                      to="/write"
                      className="Header-Container-Content-Profile-Write"
                    >
                      글 쓰기
                    </Link>
                  )}
                  <div className="Header-Container-Content-Profile-Wrapper">
                    <div
                      className="Header-Container-Content-Profile-Wrapper-User"
                      onClick={() => setShowOption(true)}
                    >
                      <img
                        src={user.avatar}
                        alt="Profile"
                        className="Header-Container-Content-Profile-Wrapper-User-Avatar"
                      />
                      <Option className="Header-Container-Content-Profile-Wrapper-User-Option" />
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
                <a
                  href={OAUTH}
                  className="Header-Container-Content-Profile-Button"
                >
                  <GitHub className="Header-Container-Content-Profile-Button-Logo" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
