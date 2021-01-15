import React from "react";
import "./Header.scss";
import { ReactComponent as Logo } from "../../../assets/images/logo.svg";
import { ReactComponent as GitHub } from "../../../assets/images/github_logo.svg";
import { ReactComponent as Option } from "../../../assets/images/option.svg";
import { BsSearch } from "react-icons/bs";
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
  scroll: number;
  showOption: boolean;
  setShowOption: React.Dispatch<React.SetStateAction<boolean>>;
  closeOption: () => void;
  handleLogout: () => void;
  pathname: string;
}

const Header = ({
  shadow,
  hide,
  admin,
  login,
  user,
  scroll,
  showOption,
  setShowOption,
  closeOption,
  handleLogout,
  pathname,
}: HeaderProps) => {
  return (
    <>
      <header
        className={
          shadow
            ? "Header-Shadow Header"
            : hide
            ? "Header-Shadow Header-Hide Header"
            : "Header"
        }
      >
        <div className="Header-Wrapper">
          <div className="Header-Wrapper-Container">
            <div className="Header-Wrapper-Container-Content">
              <Link to="/">
                <Logo className="Header-Wrapper-Container-Content-Image" />
              </Link>
              <div className="Header-Wrapper-Container-Content-Profile">
                <Link
                  to="/search"
                  className="Header-Wrapper-Container-Content-Profile-Search"
                >
                  <BsSearch />
                </Link>
                {login ? (
                  <>
                    {admin && (
                      <Link
                        to="/write"
                        className="Header-Wrapper-Container-Content-Profile-Write"
                      >
                        글 쓰기
                      </Link>
                    )}
                    <div className="Header-Wrapper-Container-Content-Profile-Wrapper">
                      <div
                        className="Header-Wrapper-Container-Content-Profile-Wrapper-User"
                        onClick={() => setShowOption(true)}
                      >
                        <img
                          src={user.avatar}
                          alt="Profile"
                          className="Header-Wrapper-Container-Content-Profile-Wrapper-User-Avatar"
                        />
                        <Option className="Header-Wrapper-Container-Content-Profile-Wrapper-User-Option" />
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
                    className="Header-Wrapper-Container-Content-Profile-Button"
                  >
                    <GitHub className="Header-Wrapper-Container-Content-Profile-Button-Logo" />
                  </a>
                )}
              </div>
            </div>
          </div>
          {pathname.split("/")[1] === "post" && (
            <div className="Header-Wrapper-ProgressBar">
              <div
                className="Header-Wrapper-ProgressBar-Container"
                style={{ transform: `scale(${scroll}, 1)` }}
              />
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
