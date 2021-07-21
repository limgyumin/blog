import React, { memo } from "react";
import { Link } from "react-router-dom";
import useFetchProfile from "hooks/user/useFetchProfile";
import useHeader from "hooks/common/useHeader";
import HeaderProfile from "./HeaderProfile";
import HeaderProgress from "./HeaderProgress";
import HeaderProfileMenu from "./HeaderProfileMenu";
import HeaderMenuTab from "./HeaderMenuTab";
import HeaderButtons from "./HeaderButtons";
import HeaderMenu from "./HeaderMenu";
import HeaderLogin from "./HeaderLogin";
import useCustomMedia from "hooks/util/useCustomMedia";
import * as S from "./styles";

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
    <S.HeaderWrapper>
      <S.HeaderContainer>
        {isTablet && (
          <Link to="/">
            <S.HeaderLogo />
          </Link>
        )}
        <HeaderMenuTab />
        <S.HeaderActions>
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
                  onClickItem={handleClickItem}
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
        </S.HeaderActions>
      </S.HeaderContainer>
      {isPost && <HeaderProgress scroll={scroll} />}
    </S.HeaderWrapper>
  );
};

export default memo(Header);
