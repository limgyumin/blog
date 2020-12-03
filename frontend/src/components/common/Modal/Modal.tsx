import React from "react";
import "./Modal.scss";

interface ModalProps {
  open: boolean;
  show: boolean;
  showModal: () => void;
  children: React.ReactNode;
}

const Modal = ({ open, show, showModal, children }: ModalProps) => {
  return (
    <>
      {show ? (
        <div className="Modal">
          <div
            className={
              open
                ? "Modal-Overlay-Active Modal-Overlay"
                : "Modal-Overlay-Leave Modal-Overlay"
            }
            onClick={() => showModal()}
          />
          <div
            className={
              open ? "Modal-Box-Active Modal-Box" : "Modal-Box-Leave Modal-Box"
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
