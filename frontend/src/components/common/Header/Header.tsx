import React from "react";
import "./Header.scss";
import logo from "../../../assets/images/logo.svg";
import Button from "../Button";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  return (
    <>
      <div className="Header">
        <img className="Header-Image" src={logo} alt={logo} />
        <div className="Header-Profile">
          <Button text="로그인" />
        </div>
      </div>
    </>
  );
};

export default Header;
