import { observer } from "mobx-react";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Header from "../../components/common/Header";
import useStore from "../../util/lib/hooks/useStore";
import axios from "axios";
import { useLocation } from "react-router-dom";

interface HeaderContainerProps {}

const HeaderContainer = ({}: HeaderContainerProps) => {
  const { store } = useStore();
  const { categories, totalPostCount } = store.CategoryStore;
  const { handleLoginState, handleAdminState } = store.UserStore;
  const { admin, login, user, handleMyProfile } = store.UserStore;

  const [showOption, setShowOption] = useState<boolean>(false);
  const [hide, setHide] = useState<boolean>(false);
  const [shadow, setShadow] = useState<boolean>(false);
  const [pageY, setPageY] = useState<number>(0);
  const documentRef = useRef(document);
  const { pathname } = useLocation();

  const handleScroll = () => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const hide = pageYOffset !== 0 && deltaY >= 0;
    const shadow = pageYOffset > 30 && deltaY < 0;
    setShadow(shadow);
    setHide(hide);
    setPageY(pageYOffset);
  };

  const handleMyProfileCallback = useCallback(async () => {
    if (!login && localStorage.getItem("access_token")) {
      axios.defaults.headers.common["access_token"] = `${localStorage.getItem(
        "access_token"
      )}`;
      handleMyProfile().catch((err: Error) => {
        if (err.message.indexOf("410")) {
          console.log("토큰이 만료됐떵.");
        }
      });
    }
  }, [login]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    axios.defaults.headers.common["access_token"] = "";
    handleLoginState(false);
    handleAdminState(false);
  };

  const closeOption = (e: any) => {
    if (
      e.target &&
      !(
        e.target.classList.contains("Header-Option") ||
        e.target.classList.contains("Header-Option-MyProfile") ||
        e.target.classList.contains("Header-Option-MyProfile-Text") ||
        e.target.classList.contains("Header-Option-ReadList") ||
        e.target.classList.contains("Header-Option-ReadList-Text") ||
        e.target.classList.contains("Header-Option-TempList") ||
        e.target.classList.contains("Header-Option-TempList-Text") ||
        e.target.classList.contains("Header-Option-Logout") ||
        e.target.classList.contains("Header-Option-Logout-Text")
      )
    ) {
      setShowOption(false);
    }
  };

  useEffect(() => {
    handleMyProfileCallback();
  }, [handleMyProfileCallback]);

  useEffect(() => {
    documentRef.current.addEventListener("scroll", handleScroll);
    return () =>
      documentRef.current.removeEventListener("scroll", handleScroll);
  }, [pageY]);

  return (
    <>
      <Header
        shadow={shadow}
        hide={hide}
        admin={admin}
        login={login}
        user={user}
        showOption={showOption}
        setShowOption={setShowOption}
        closeOption={closeOption}
        handleLogout={handleLogout}
        totalPostCount={totalPostCount}
        categories={categories}
        pathname={pathname}
      />
    </>
  );
};

export default observer(HeaderContainer);
