import React, { FC } from "react";
import IUser from "types/user.type";
import { headerMenuTabModel } from "models/headerMenuTabModel";
import HeaderMenuProfile from "./HeaderMenuProfile";
import HeaderMenuLogin from "./HeaderMenuLogin";
import HeaderMenuTop from "./HeaderMenuTop";
import styled from "styled-components";

type HeaderMenuProps = {
  login: boolean;
  admin: boolean;
  profile: IUser;
  onClickItem: (path: string) => void;
  onClickLogout: () => void;
  onClickClose: () => void;
};

const HeaderMenu: FC<HeaderMenuProps> = ({
  login,
  admin,
  profile,
  onClickItem,
  onClickLogout,
  onClickClose,
}) => {
  return (
    <HeaderMenuWrapper>
      <HeaderMenuContainer>
        <HeaderMenuTop onClickClose={onClickClose} />
        <HeaderMenuAuth>
          {login ? (
            <HeaderMenuProfile profile={profile} />
          ) : (
            <HeaderMenuLogin />
          )}
        </HeaderMenuAuth>
        <HeaderMenuContent>
          {login && admin && (
            <HeaderMenuRestrict>
              <HeaderMenuItem onClick={() => onClickItem("/temp")}>
                임시 글
              </HeaderMenuItem>
              <HeaderMenuItem onClick={() => onClickItem("/write")}>
                글 쓰기
              </HeaderMenuItem>
            </HeaderMenuRestrict>
          )}
          {headerMenuTabModel.map((tabMenu, idx) => (
            <HeaderMenuItem key={idx} onClick={() => onClickItem(tabMenu.path)}>
              {tabMenu.label}
            </HeaderMenuItem>
          ))}
          {login && (
            <HeaderMenuLogout onClick={onClickLogout}>
              로그아웃
            </HeaderMenuLogout>
          )}
        </HeaderMenuContent>
      </HeaderMenuContainer>
    </HeaderMenuWrapper>
  );
};

const HeaderMenuWrapper = styled.div`
  left: 0;
  top: 0;
  position: fixed;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 101;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.bgColor};
`;

const HeaderMenuContainer = styled.div`
  padding: 2rem 1.5rem;
`;

const HeaderMenuAuth = styled.div`
  width: 100%;
  margin-top: 3rem;
`;

const HeaderMenuContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  margin-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.color.bdColor};
`;

const HeaderMenuRestrict = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.bdColor};
`;

const HeaderMenuItem = styled.div`
  width: 100%;
  text-decoration: none;
  padding: 0.8rem;
  font-size: 1.125rem;
  font-weight: bold;
  color: var(--theme-text-scale-2);
  border-radius: 0.2rem;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.bgColor2};
  }
`;

const HeaderMenuLogout = styled(HeaderMenuItem)`
  color: ${({ theme }) => theme.color.ftColor5};
`;

export default HeaderMenu;
