import React from "react";
import "./Footer.scss";

interface FooterProps {}

const Footer = ({}: FooterProps) => {
  return (
    <>
      <footer className="Footer">
        <div className="Footer-Container">
          <p className="Footer-Container-Content">
            © 2021. limgyumin. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
