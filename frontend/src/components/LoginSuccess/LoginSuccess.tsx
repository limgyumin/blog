import React from "react";
import "./LoginSuccess.scss";
import { ReactComponent as Check } from "../../assets/images/check.svg";
import { ReactComponent as Shadow } from "../../assets/images/shadow.svg";

interface LoginSuccessProps {}

const LoginSuccess = ({}: LoginSuccessProps) => {
  return (
    <>
      <div className="Login-Success">
        <Check className="Login-Success-Check" />
        <div className="Login-Success-Container">
          <div className="Login-Success-Container-Image">
            <Shadow className="Login-Success-Container-Image-Shadow" />
          </div>
          <p className="Login-Success-Container-Title">
            로그인이 완료되었습니다!
          </p>
          <p className="Login-Success-Container-Subtitle">
            조금만 기다려주세요... 🤤
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginSuccess;
