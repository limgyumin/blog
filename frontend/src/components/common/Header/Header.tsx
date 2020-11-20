import React from "react";
import "./Header.scss";
import { ReactComponent as Logo } from "../../../assets/images/logo.svg";
import { ReactComponent as GitHub } from "../../../assets/images/github_logo.svg";
import { OAUTH } from "../../../config/config.json";

interface HeaderProps {
  shadow: boolean;
  hide: boolean;
}

const Header = ({ shadow, hide }: HeaderProps) => {
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
          <Logo className="Header-Container-Image" />
          <div className="Header-Container-Profile">
            <a href={OAUTH} className="Header-Container-Profile-Button">
              <GitHub />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
