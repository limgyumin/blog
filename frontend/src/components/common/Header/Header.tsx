import React from "react";
import { ReactComponent as Logo } from "../../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import useFetchProfile from "hooks/user/useFetchProfile";
import useHeader from "hooks/common/useHeader";
import HeaderProfile from "./HeaderProfile";
import HeaderProgress from "./HeaderProgress";
import HeaderProfileMenu from "../HeaderProfileMenu";
import { memo } from "react";
import HeaderMenuTab from "./HeaderMenuTab";
import HeaderButtons from "./HeaderButtons";
import HeaderMenu from "./HeaderMenu";
import styled from "styled-components";
import HeaderLogin from "./HeaderLogin";
import useCustomMedia from "hooks/util/useCustomMedia";

const Header = () => {
  const { login, admin, profile } = useFetchProfile();
  const {
    isPost,
    clickEl,
    menuEl,
    scroll,
    showMenu,
    handleLogout,
    handleShowMenu,
    handleClickItem,
    handleClickSearch,
  } = useHeader();

  const isTablet = useCustomMedia("tablet");

  return (
    <HeaderWrapper>
      <HeaderContainer>
        {isTablet && (
          <Link to="/">
            <HeaderLogo />
          </Link>
        )}
        <HeaderMenuTab />
        <HeaderActions>
          <HeaderButtons
            isTablet={isTablet}
            onClickMenu={handleShowMenu}
            onClickSearch={handleClickSearch}
          />
          {isTablet &&
            (login && profile.id ? (
              <HeaderProfile
                menuEl={menuEl}
                admin={admin}
                profile={profile}
                onClick={handleShowMenu}
              />
            ) : (
              <HeaderLogin />
            ))}
          {showMenu &&
            (isTablet ? (
              login && (
                <HeaderProfileMenu
                  admin={admin}
                  clickEl={clickEl}
                  onClickTemp={handleClickItem}
                  onClickLogout={handleLogout}
                />
              )
            ) : (
              <HeaderMenu
                login={login}
                admin={admin}
                profile={profile}
                onClickItem={handleClickItem}
                onClickLogout={handleLogout}
                onClickClose={handleShowMenu}
              />
            ))}
        </HeaderActions>
      </HeaderContainer>
      {isPost && <HeaderProgress scroll={scroll} />}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  width: 100%;
  height: 3.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.bgColor};
  transition: transform ease 0.5s, box-shadow ease 0.3s;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  border-bottom: 1px solid ${({ theme }) => theme.color.bdColor};
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 1rem;
  max-width: 1250px;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const HeaderLogo = styled(Logo)`
  width: auto;
  height: 1.125rem;

  & > path {
    fill: ${({ theme }) => theme.color.ftColor};
  }
`;

export default memo(Header);
