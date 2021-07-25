import React from "react";
import styled, { css } from "styled-components";
import { Link, useLocation } from "react-router-dom";

import { IHeaderMenuTab } from "models/headerMenuTabModel";

type Props = {
  tabMenu: IHeaderMenuTab;
};

const HeaderMenuTabItem: React.FC<Props> = ({ tabMenu }) => {
  const { pathname } = useLocation();

  const { label, path } = tabMenu;
  const isMatch = pathname === path;

  return (
    <Container to={path} $active={isMatch}>
      {label}
    </Container>
  );
};

const Container = styled(Link)<{ $active: boolean }>`
  text-decoration: none;
  font-size: 0.925rem;
  color: var(--theme-text-scale-1);
  font-weight: bold;
  padding: 1rem;
  &:hover {
    box-shadow: inset 0 -2px var(--theme-background-scale-0);
  }
  ${(props) =>
    props.$active
      ? css`
          box-shadow: inset 0 -2px ${({ theme }) => theme.color.ftColor2};
        `
      : css`
          box-shadow: none;
        `};
  ${({ theme }) => theme.media.tablet} {
    padding: 1rem 0.5rem;
  }
`;

export default HeaderMenuTabItem;
