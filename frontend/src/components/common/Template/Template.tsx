import React from "react";
import HeaderContainer from "../../../containers/Header/HeaderContainer";
import SideBarContainer from "../../../containers/SideBar/SideBarContainer";

interface TemplateProps {
  children: React.ReactNode;
}

const Template = ({ children }: TemplateProps) => {
  return (
    <>
      <HeaderContainer />
      <SideBarContainer />
      {children}
    </>
  );
};

export default Template;
