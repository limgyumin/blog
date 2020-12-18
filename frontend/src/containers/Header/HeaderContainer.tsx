import { observer } from "mobx-react";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Header from "../../components/common/Header";
import useStore from "../../util/lib/hooks/useStore";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

interface HeaderContainerProps {}

const HeaderContainer = ({}: HeaderContainerProps) => {
  const history = useHistory();
  const { pathname } = useLocation();

  const { store } = useStore();
  const { categories, totalPostCount } = store.CategoryStore;
  const { handleLoginState, handleAdminState } = store.UserStore;
  const { admin, login, user, handleMyProfile } = store.UserStore;

  const [open, setOpen] = useState<boolean>(false);
  const [hide, setHide] = useState<boolean>(false);
  const [shadow, setShadow] = useState<boolean>(false);
  const [showOption, setShowOption] = useState<boolean>(false);
  const [transparent, setTransparent] = useState<boolean>(false);
  const [enable, setEnable] = useState<boolean>(false);

  const [pageY, setPageY] = useState<number>(0);
  const documentRef = useRef(document);

  const scrollHandler = () => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const hide = pageYOffset !== 0 && deltaY >= 0;
    const shadow = (pageYOffset > 30 && deltaY < 0) || open;
    const transparent = pageYOffset < 835 && pathname === "/";
    const enable = pageYOffset > 1080 && pathname === "/";

    setEnable(enable);
    setTransparent(transparent);
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
          toast.info("다시 로그인을 해주세요.");
          handleLogout();
        }
      });
    }
  }, [login]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    axios.defaults.headers.common["access_token"] = "";
    handleLoginState(false);
    handleAdminState(false);
    history.push("/");
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
    const { pageYOffset } = window;
    const transparent = pageYOffset < 835 && pathname === "/";
    setTransparent(transparent);
  }, []);

  useEffect(() => {
    documentRef.current.addEventListener("scroll", scrollHandler);
    return () =>
      documentRef.current.removeEventListener("scroll", scrollHandler);
  }, [pageY]);

  useEffect(() => {
    setShadow(open);
  }, [open]);

  return (
    <>
      <Header
        enable={enable}
        transparent={transparent}
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
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default observer(HeaderContainer);
