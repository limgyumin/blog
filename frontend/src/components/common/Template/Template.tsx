import React from "react";
import HeaderContainer from "../../../containers/Header/HeaderContainer";

interface TemplateProps {
  children: React.ReactNode;
}

const Template = ({ children }: TemplateProps) => {
  return (
    <>
      <HeaderContainer />
      {children}
    </>
  );
};

export default Template;
