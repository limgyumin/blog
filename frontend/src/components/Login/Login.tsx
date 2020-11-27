import React from "react";
import "./Login.scss";
import { ReactComponent as Check } from "../../assets/images/check.svg";
import { ReactComponent as Shadow } from "../../assets/images/shadow.svg";

interface LoginProps {}

const Login = ({}: LoginProps) => {
  return (
    <>
      <div className="Login">
        <Check className="Login-Check" />
        <div className="Login-Container">
          <div className="Login-Container-Image">
            <Shadow className="Login-Container-Image-Shadow" />
          </div>
          <p className="Login-Container-Title">로그인이 완료되었습니다!</p>
          <p className="Login-Container-Subtitle">조금만 기다려주세요... 🤤</p>
        </div>
      </div>
    </>
  );
};

export default Login;
