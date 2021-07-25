import React from "react";
import styled from "styled-components";

import HeaderMenuProfile from "./HeaderMenuProfile";
import HeaderMenuLogin from "./HeaderMenuLogin";
import HeaderMenuTop from "./HeaderMenuTop";

import { headerMenuTabModel } from "models/headerMenuTabModel";
import IUser from "types/user.type";

type Props = {
  login: boolean;
  admin: boolean;
  profile: IUser;
  onClickItem: (path: string) => void;
  onClickLogout: () => void;
  onClickClose: () => void;
};

const HeaderMenu: React.FC<Props> = ({
  login,
  admin,
  profile,
  onClickItem,
  onClickLogout,
  onClickClose,
}) => {
  return (
    <Container>
      <Wrapper>
        <HeaderMenuTop onClickClose={onClickClose} />
        <Profile>
          {login ? (
            <HeaderMenuProfile profile={profile} />
          ) : (
            <HeaderMenuLogin />
          )}
        </Profile>
        <Content>
          {login && admin && (
            <Admin>
              <Item onClick={() => onClickItem("/temp")}>임시 글</Item>
              <Item onClick={() => onClickItem("/write")}>글 쓰기</Item>
            </Admin>
          )}
          {headerMenuTabModel.map((tabMenu, idx) => (
            <Item key={idx} onClick={() => onClickItem(tabMenu.path)}>
              {tabMenu.label}
            </Item>
          ))}
          {login && <Logout onClick={onClickLogout}>로그아웃</Logout>}
        </Content>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
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

const Wrapper = styled.div`
  padding: 2rem 1.5rem;
`;

const Profile = styled.div`
  width: 100%;
  margin-top: 3rem;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  margin-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.color.bdColor};
`;

const Admin = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.bdColor};
`;

const Item = styled.div`
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

const Logout = styled(Item)`
  color: ${({ theme }) => theme.color.ftColor5};
`;

export default HeaderMenu;
