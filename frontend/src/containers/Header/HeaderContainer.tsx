import { observer } from "mobx-react";
import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/common/Header";
import useStore from "../../util/lib/hooks/useStore";

interface HeaderContainerProps {}

const HeaderContainer = ({}: HeaderContainerProps) => {
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

  useEffect(() => {
    documentRef.current.addEventListener("scroll", handleScroll);
    return () =>
      documentRef.current.removeEventListener("scroll", handleScroll);
  }, [pageY]);

  return (
    <>
      <Header shadow={shadow} hide={hide} />
    </>
  );
};

export default observer(HeaderContainer);
