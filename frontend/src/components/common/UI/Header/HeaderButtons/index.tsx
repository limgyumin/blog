import React, { FC } from "react";
import useTheme from "hooks/util/useTheme";
import { FiMenu, FiMoon, FiSearch, FiSun } from "react-icons/fi";
import styled from "styled-components";

type HeaderButtonsProps = {
  isTablet: boolean;
  onClickMenu: () => void;
  onClickSearch: () => void;
};

const HeaderButtons: FC<HeaderButtonsProps> = ({
  isTablet,
  onClickMenu,
  onClickSearch,
}) => {
  const { isLight, handleChangeTheme } = useTheme();

  return (
    <HeaderButtonsWrapper>
      <HeaderButtonsItem onClick={onClickSearch}>
        <FiSearch />
      </HeaderButtonsItem>
      <HeaderButtonsItem onClick={handleChangeTheme}>
        {isLight ? <FiMoon /> : <FiSun />}
      </HeaderButtonsItem>
      {!isTablet && (
        <HeaderButtonsItem onClick={onClickMenu}>
          <FiMenu />
        </HeaderButtonsItem>
      )}
    </HeaderButtonsWrapper>
  );
};

const HeaderButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderButtonsItem = styled.div`
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
