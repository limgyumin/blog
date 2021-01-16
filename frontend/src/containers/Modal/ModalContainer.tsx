import React, { useEffect } from "react";
import { observer } from "mobx-react";
import Modal from "../../components/common/Modal";
import "../../util/theme.scss";

interface ModalContainerProps {
  children: React.ReactNode;
  isOpen: boolean;
  isShow: boolean;
}

const ModalContainer = ({ children, isOpen, isShow }: ModalContainerProps) => {
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
      <Modal className="Modal light" isOpen={isOpen} isShow={isShow}>
        {children}
      </Modal>
    </>
  );
};

export default observer(ModalContainer);
