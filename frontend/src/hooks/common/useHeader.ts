import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import useClose from "hooks/util/useClose";
import { initUser } from "modules/user";
import token from "lib/token";
import { useDispatch } from "react-redux";

export default function useHeader() {
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const history = useHistory();

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [scroll, setScroll] = useState<number>(0);

  const clickEl = useRef<HTMLDivElement>(null);
  const menuEl = useRef<HTMLDivElement>(null);

  const isPost = useMemo(() => pathname.split("/")[1] === "post", [pathname]);

  const handleShowMenu = useCallback(() => {
    setShowMenu((prevState) => !prevState);
  }, []);

  const handleClickItem = (path: string) => {
    history.push(path);
    handleShowMenu();
  };

  const handleClickSearch = () => {
    history.push("/search");
  };

  const handleProgressBar = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const windowHeight = scrollHeight - clientHeight;
    const progress = scrollTop / windowHeight;

    setScroll(progress);
  }, []);

  const handleLogout = () => {
    dispatch(initUser());
    handleShowMenu();
    token.remove();
  };

  useClose<HTMLDivElement>(clickEl, menuEl, handleShowMenu);

  useEffect(() => {
    window.addEventListener("scroll", handleProgressBar);
    return () => window.removeEventListener("scroll", handleProgressBar);
  }, [handleProgressBar]);

  useEffect(() => {
    return () => {
      setShowMenu(false);
      setScroll(0);
    };
  }, []);

  return {
    isPost,
    clickEl,
    menuEl,
    scroll,
    showMenu,
    handleLogout,
    handleShowMenu,
    handleClickItem,
    handleClickSearch,
  };
}
