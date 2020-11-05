import React from "react";
import "./Header.scss";
import logo from "../../../assets/images/logo.svg";
import Button from "../Button";

interface HeaderProps {
  shadow: boolean;
  hide: boolean;
}

const Header = ({ shadow, hide }: HeaderProps) => {
  return (
    <>
      <div className="Header">
        <div
          className={
            hide
              ? "Header-Container-Hide Header-Container"
              : shadow
              ? "Header-Container-Shadow Header-Container"
              : "Header-Container"
          }
        >
          <img className="Header-Container-Image" src={logo} alt={logo} />
          <div className="Header-Container-Profile">
            <Button text="로그인" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
