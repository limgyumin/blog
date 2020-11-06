import React from "react";
import "./LoginSuccess.scss";
import check from "../../../assets/images/check.svg";
import shadow from "../../../assets/images/shadow.svg";

interface LoginSuccessProps {}

const LoginSuccess = ({}: LoginSuccessProps) => {
  return (
    <>
      <div className="Login-Success">
        <img className="Login-Success-Check" src={check} alt={check} />
        <div className="Login-Success-Container">
          <div className="Login-Success-Container-Image">
            <img
              className="Login-Success-Container-Image-Shadow"
              src={shadow}
              alt={shadow}
            />
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
