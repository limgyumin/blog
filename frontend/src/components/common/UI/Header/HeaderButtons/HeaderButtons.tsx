import React from "react";
import styled from "styled-components";
import { FiMenu, FiMoon, FiSearch, FiSun } from "react-icons/fi";

import useTheme from "hooks/util/useTheme";

type Props = {
  isTablet: boolean;
  onClickMenu: () => void;
  onClickSearch: () => void;
};

const HeaderButtons: React.FC<Props> = ({
  isTablet,
  onClickMenu,
  onClickSearch,
}) => {
  const { isLight, handleChangeTheme } = useTheme();

  return (
    <Container>
      <ButtonItem onClick={onClickSearch}>
        <FiSearch />
      </ButtonItem>
      <ButtonItem onClick={handleChangeTheme}>
        {isLight ? <FiMoon /> : <FiSun />}
      </ButtonItem>
      {!isTablet && (
        <ButtonItem onClick={onClickMenu}>
          <FiMenu />
        </ButtonItem>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  margin-right: 0.3rem;
  border-radius: 50%;
  padding: 0.4rem;
  transition: background-color ease 0.1s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.bgColor2};
  }

  & > svg {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.color.ftColor1};
  }
`;

export default HeaderButtons;
