import React, { memo } from "react";
import { headerMenuTabModel } from "models/headerMenuTabModel";
import styled from "styled-components";
import MenuTabItem from "./HeaderMenuTabItem";

const HeaderMenuTab = () => {
  return (
    <HeaderMenuTabWrapper>
      {headerMenuTabModel.map((tabMenu, idx) => (
        <MenuTabItem key={idx} tabMenu={tabMenu} />
      ))}
    </HeaderMenuTabWrapper>
  );
};

const HeaderMenuTabWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export default memo(HeaderMenuTab);
