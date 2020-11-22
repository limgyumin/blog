import React from "react";
import "./Header.scss";
import { ReactComponent as Logo } from "../../../assets/images/logo.svg";
import { ReactComponent as GitHub } from "../../../assets/images/github_logo.svg";
import { OAUTH } from "../../../config/config.json";
import { Link } from "react-router-dom";
import UserType from "../../../util/types/User";

interface HeaderProps {
  shadow: boolean;
  hide: boolean;
  admin: boolean;
  login: boolean;
  user?: UserType;
}

const Header = ({ shadow, hide, admin, login, user }: HeaderProps) => {
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
                <img
                  src={user?.avatar}
                  alt="Profile"
                  className="Header-Container-Profile-Avatar"
                />
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
