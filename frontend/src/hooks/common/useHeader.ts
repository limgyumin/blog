import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import useClose from "hooks/util/useClose";

export default function useHeader() {
  const { pathname } = useLocation();

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [scroll, setScroll] = useState<number>(0);

  const clickEl = useRef<HTMLDivElement>(null);
  const menuEl = useRef<HTMLDivElement>(null);

  const isPost = useMemo(() => pathname.split("/")[1] === "post", [pathname]);

  const onShowMenu = useCallback(() => {
    setShowMenu(!showMenu);
  }, [showMenu]);

  const progressBarHandler = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const windowHeight = scrollHeight - clientHeight;
    const progress = scrollTop / windowHeight;

    setScroll(progress);
  }, []);

  useClose<HTMLDivElement>(clickEl, menuEl, onShowMenu);

  useEffect(() => {
    window.addEventListener("scroll", progressBarHandler);
    return () => window.removeEventListener("scroll", progressBarHandler);
  }, [progressBarHandler]);

  useEffect(() => {
    return () => {
      setShowMenu(false);
      setScroll(0);
    };
  }, []);

  return {
    clickEl,
    menuEl,
    scroll,
    showMenu,
    isPost,
    onShowMenu,
  };
}
