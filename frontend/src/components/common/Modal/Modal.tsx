import React from "react";
import "./Modal.scss";

interface ModalProps {
  className: string;
  isOpen: boolean;
  isShow: boolean;
  children: React.ReactNode;
}

const Modal = ({ className, isOpen, isShow, children }: ModalProps) => {
  return (
    <>
      {isShow ? (
        <div className={className}>
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
