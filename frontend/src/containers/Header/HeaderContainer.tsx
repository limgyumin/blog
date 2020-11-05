import { inject, observer } from "mobx-react";
import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/common/Header";
import LoginStore from "../../stores/Login";

interface HeaderContainerProps {
  store?: StoreType;
}

interface StoreType {
  LoginStore: LoginStore;
}

const HeaderContainer = ({ store }: HeaderContainerProps) => {
  const { showModal } = store!.LoginStore;

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
      <Header shadow={shadow} hide={hide} showModal={showModal} />
    </>
  );
};

export default inject("store")(observer(HeaderContainer));
