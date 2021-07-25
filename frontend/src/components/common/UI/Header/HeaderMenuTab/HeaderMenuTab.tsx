import React, { memo } from "react";
import styled from "styled-components";

import MenuTabItem from "./HeaderMenuTabItem";

import { headerMenuTabModel } from "models/headerMenuTabModel";

type Props = unknown;

const HeaderMenuTab: React.FC<Props> = () => {
  return (
    <Container>
      {headerMenuTabModel.map((tabMenu, idx) => (
        <MenuTabItem key={idx} tabMenu={tabMenu} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export default memo(HeaderMenuTab);
