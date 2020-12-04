import React from "react";
import "./Modal.scss";

interface ModalProps {
  isOpen: boolean;
  isShow: boolean;
  children: React.ReactNode;
}

const Modal = ({ isOpen, isShow, children }: ModalProps) => {
  return (
    <>
      {isShow ? (
        <div className="Modal">
          <div
            className={
              isOpen
                ? "Modal-Overlay-Active Modal-Overlay"
                : "Modal-Overlay-Leave Modal-Overlay"
            }
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
