import React from "react";
import "./Header.scss";
import logo from "../../../assets/images/logo.svg";

interface HeaderProps {
  shadow: boolean;
  hide: boolean;
  showModal: () => void;
}

const Header = ({ shadow, hide, showModal }: HeaderProps) => {
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
          <img className="Header-Container-Image" src={logo} alt={logo} />
          <div className="Header-Container-Profile">
            <button
              className="Header-Container-Profile-Button"
              onClick={() => showModal()}
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
