import { observer } from "mobx-react";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Header from "../../components/common/Header";
import useStore from "../../util/lib/hooks/useStore";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

interface HeaderContainerProps {}

const HeaderContainer = ({}: HeaderContainerProps) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const { store } = useStore();
  const { handleLoginState, handleAdminState } = store.UserStore;
  const { admin, login, user, handleMyProfile } = store.UserStore;

  const [hide, setHide] = useState<boolean>(false);
  const [shadow, setShadow] = useState<boolean>(false);
  const [showOption, setShowOption] = useState<boolean>(false);
  const [scroll, setScroll] = useState<number>(0);

  const [pageY, setPageY] = useState<number>(0);
  const documentRef = useRef(document);

  const scrollHandler = () => {
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

  const closeOption = () => {
    setShowOption(false);
  };

  const progressBarHandler = () => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const progress = totalScroll / windowHeight;

    setScroll(progress);
  };

  useEffect(() => {
    window.addEventListener("scroll", progressBarHandler);
    return () => window.removeEventListener("scroll", progressBarHandler);
  }, []);

  useEffect(() => {
    handleMyProfileCallback();
  }, [handleMyProfileCallback]);

  useEffect(() => {
    if (hide) {
      closeOption();
    }
  }, [hide]);

  useEffect(() => {
    documentRef.current.addEventListener("scroll", scrollHandler);
    return () =>
      documentRef.current.removeEventListener("scroll", scrollHandler);
  }, [pageY]);

  return (
    <>
      <Header
        shadow={shadow}
        hide={hide}
        admin={admin}
        login={login}
        user={user}
        scroll={scroll}
        showOption={showOption}
        setShowOption={setShowOption}
        closeOption={closeOption}
        handleLogout={handleLogout}
        pathname={pathname}
      />
    </>
  );
};

export default observer(HeaderContainer);
