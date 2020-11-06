import React, { useEffect } from "react";
import "./Modal.scss";

interface ModalProps {
  isShowed: boolean;
  isOpen: boolean;
  showModal: () => void;
  children: React.ReactNode;
}

const Modal = ({ isShowed, isOpen, showModal, children }: ModalProps) => {
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
      {isShowed ? (
        <div className="Modal">
          <div
            className={
              isOpen
                ? "Modal-Overlay-Active Modal-Overlay"
                : "Modal-Overlay-Leave Modal-Overlay"
            }
            onClick={() => showModal()}
          />
          <div
            className={
              isOpen
                ? "Modal-Box-Active Modal-Box"
                : "Modal-Box-Leave Modal-Box"
            }
          >
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
