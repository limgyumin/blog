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
  const { isShowed, showModal } = store!.LoginStore;
  return (
    <>
      {isShowed ? (
        <Modal isShowed={isShowed} showModal={showModal}>
          <Login />
        </Modal>
      ) : null}
    </>
  );
};

export default inject("store")(observer(LoginContainer));
