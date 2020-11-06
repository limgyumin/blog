import { inject, observer } from "mobx-react";
import React from "react";
import Modal from "../../components/common/Modal";
import Login from "../../components/Login";
import LoginStore from "../../stores/Login";

interface LoginContainerProps {
  store?: StoreType;
}

interface StoreType {
  LoginStore: LoginStore;
}

const LoginContainer = ({ store }: LoginContainerProps) => {
  const { isShowed, isOpen, showModal } = store!.LoginStore;
  return (
    <>
      <Modal isShowed={isShowed} isOpen={isOpen} showModal={showModal}>
        <Login />
      </Modal>
    </>
  );
};

export default inject("store")(observer(LoginContainer));
