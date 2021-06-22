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

  const showMenuHandler = useCallback(() => {
    setShowMenu(!showMenu);
  }, [showMenu, setShowMenu]);

  const progressBarHandler = () => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight =
      document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = totalScroll / windowHeight;

    setScroll(progress);
  };

  useClose<HTMLDivElement>(clickEl, menuEl, showMenuHandler);

  useEffect(() => {
    window.addEventListener("scroll", progressBarHandler);
    return () => window.removeEventListener("scroll", progressBarHandler);
  }, []);

  return {
    clickEl,
    menuEl,
    scroll,
    showMenu,
    isPost,
    showMenuHandler,
  };
}
