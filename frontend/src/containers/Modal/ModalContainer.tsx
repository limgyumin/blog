import React, { useEffect } from "react";
import { observer } from "mobx-react";
import Modal from "../../components/common/Modal";
import "../../util/theme.scss";
import useStore from "../../util/lib/hooks/useStore";

interface ModalContainerProps {
  children: React.ReactNode;
  isOpen: boolean;
  isShow: boolean;
}

const ModalContainer = ({ children, isOpen, isShow }: ModalContainerProps) => {
  const { store } = useStore();
  const { theme, handleThemeState } = store.ThemeStore;

  const validateTheme = () => {
    const currentTheme = localStorage.getItem("theme");
    if (!currentTheme || currentTheme === "light") {
      handleThemeState(false);
    } else {
      handleThemeState(true);
    }
  };

  useEffect(() => {
    validateTheme();
  }, []);

  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <Modal
        className={`Modal ${!theme ? "light" : "dark"}`}
        isOpen={isOpen}
        isShow={isShow}
      >
        {children}
      </Modal>
    </>
  );
};

export default observer(ModalContainer);
