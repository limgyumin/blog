import React, { FC } from "react";
import { FaSave } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import styled from "styled-components";

type HeaderProfileMenuProps = {
  clickEl: React.MutableRefObject<HTMLDivElement>;
  admin: boolean;
  onClickItem: (path: string) => void;
  onClickLogout: () => void;
};

const HeaderProfileMenu: FC<HeaderProfileMenuProps> = ({
  clickEl,
  admin,
  onClickItem,
  onClickLogout,
}) => {
  return (
    <HeaderProfileMenuWrapper ref={clickEl}>
      {admin && (
        <HeaderProfileMenuItem onClick={() => onClickItem("/temp")}>
          <HeaderProfileMenuItemIcon>
            <FaSave />
          </HeaderProfileMenuItemIcon>
          <HeaderProfileMenuItemText>임시 글</HeaderProfileMenuItemText>
        </HeaderProfileMenuItem>
      )}
      <HeaderProfileMenuItem onClick={onClickLogout}>
        <HeaderProfileMenuItemIcon>
          <ImExit />
        </HeaderProfileMenuItemIcon>
        <HeaderProfileMenuItemText>로그아웃</HeaderProfileMenuItemText>
      </HeaderProfileMenuItem>
    </HeaderProfileMenuWrapper>
  );
};

const HeaderProfileMenuWrapper = styled.div`
  top: 3.2rem;
  left: 3.4rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 0.6rem rgba(0, 0, 0, 0.15);
  background: ${({ theme }) => theme.color.bgColor};
  width: 12rem;
  height: auto;
  position: absolute;
  border-radius: 0.2rem;

  &:after,
  &:before {
    bottom: 100%;
    left: 25%;
    border: solid transparent;
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  &:after {
    border-color: rgba(163, 163, 163, 0);
    border-bottom-color: ${({ theme }) => theme.color.bgColor};
    border-width: 10px;
    margin-left: -10px;
  }
  &:before {
    border-color: rgba(162, 162, 162, 0);
    border-bottom-color: ${({ theme }) => theme.color.bdColor};
    border-width: 12px;
    margin-left: -12px;
  }
`;

const HeaderProfileMenuItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.55rem 0.8rem;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.color.bgColor3};
  }
`;

const HeaderProfileMenuItemIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.bdColor};
  margin-right: 0.6rem;

  & > svg {
    font-size: 1.125rem;
    color: ${({ theme }) => theme.color.ftColor2};
  }
`;

const HeaderProfileMenuItemText = styled.p`
  font-size: 1rem;
  font-weight: normal;
  color: ${({ theme }) => theme.color.ftColor};
`;

export default HeaderProfileMenu;
