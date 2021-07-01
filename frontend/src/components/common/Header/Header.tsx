import React from "react";
import { ReactComponent as Logo } from "../../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import useFetchProfile from "hooks/user/useFetchProfile";
import useHeader from "hooks/common/useHeader";
import HeaderProfile from "./HeaderProfile";
import HeaderAction from "./HeaderAction";
import HeaderProgress from "./HeaderProgress";
import HeaderProfileMenu from "../HeaderProfileMenu";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { memo } from "react";
import HeaderMenuTab from "./HeaderMenuTab";
import HeaderButtons from "./HeaderButtons";
import { useMediaQuery } from "react-responsive";
import HeaderMenu from "./HeaderMenu";

const styles = require("./Header.scss");
const cx: ClassNamesFn = classNames.bind(styles);

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
    handleClickTemp,
  } = useHeader();

  const isDesktop = useMediaQuery({ query: "(min-width: 730px) and (max-width: 1920px)" });

  return (
    <header className={cx("header")}>
      <div className={cx("header-wrap")}>
        {isDesktop && (
          <Link to="/">
            <Logo className={cx("header-wrap-image")} />
          </Link>
        )}
        <HeaderMenuTab />
        <div className={cx("header-wrap-right")}>
          <HeaderButtons isDesktop={isDesktop} onClick={handleShowMenu} />
          {isDesktop &&
            (login && profile.id ? (
              <HeaderProfile
                menuEl={menuEl}
                admin={admin}
                profile={profile}
                showMenu={showMenu}
                onClick={handleShowMenu}
              />
            ) : (
              <HeaderAction />
            ))}
          <div className={cx("header-wrap-right-area")}>
            {showMenu &&
              (isDesktop ? (
                login && (
                  <HeaderProfileMenu
                    admin={admin}
                    clickEl={clickEl}
                    onClickTemp={handleClickTemp}
                    onClickLogout={handleLogout}
                  />
                )
              ) : (
                <HeaderMenu
                  login={login}
                  admin={admin}
                  profile={profile}
                  onClickTemp={handleClickTemp}
                  onClickLogout={handleLogout}
                  onClose={handleShowMenu}
                />
              ))}
          </div>
        </div>
      </div>
      {isPost && <HeaderProgress scroll={scroll} />}
    </header>
  );
};

export default memo(Header);
