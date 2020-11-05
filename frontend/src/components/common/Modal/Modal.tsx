import React, { useEffect } from "react";
import "./Modal.scss";

interface ModalProps {
  isShowed: boolean;
  showModal: () => void;
  children: React.ReactNode;
}

const Modal = ({ isShowed, showModal, children }: ModalProps) => {
  useEffect(() => {
    isShowed
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      <div className="Modal">
        <div className="Modal-Overlay" onClick={() => showModal()} />
        <div className="Modal-Box">{children}</div>
      </div>
    </>
  );
};

export default Modal;
