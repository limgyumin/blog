import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import Modal from "../../components/common/Modal";
import useStore from "../../util/lib/hooks/useStore";

interface ModalContainerProps {
  children: React.ReactNode;
}

const ModalContainer = ({ children }: ModalContainerProps) => {
  const { store } = useStore();
  const { open, show, showModal } = store.ModalStore;

  useEffect(() => {
    open
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <>
      <Modal open={open} show={show} showModal={showModal}>
        {children}
      </Modal>
    </>
  );
};

export default observer(ModalContainer);
