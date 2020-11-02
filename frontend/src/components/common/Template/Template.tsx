import React from "react";
import HeaderContainer from "../../../containers/HeaderContainer/HeaderContainer";

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
