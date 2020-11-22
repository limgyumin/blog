import { observer } from "mobx-react";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Header from "../../components/common/Header";
import useStore from "../../util/lib/hooks/useStore";
import axios from "axios";

interface HeaderContainerProps {}

const HeaderContainer = ({}: HeaderContainerProps) => {
  const { store } = useStore();
  const { admin, login, user, handleMyProfile } = store.UserStore;

  const [hide, setHide] = useState<boolean>(false);
  const [shadow, setShadow] = useState<boolean>(false);
  const [pageY, setPageY] = useState<number>(0);
  const documentRef = useRef(document);

  const handleScroll = () => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const hide = pageYOffset !== 0 && deltaY >= 0;
    const shadow = pageYOffset > 50 && deltaY < 0;
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
      />
    </>
  );
};

export default observer(HeaderContainer);
