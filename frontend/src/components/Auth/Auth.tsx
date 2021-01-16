import React from "react";
import "./Auth.scss";
import ReactLoading from "react-loading";

interface AuthProps {}

const Auth = ({}: AuthProps) => {
  return (
    <>
      <div className="Auth">
        <div className="Auth-Container">
          <p className="Auth-Container-Title">로그인을 처리하는 중이에요!</p>
          <p className="Auth-Container-Subtitle">조금만 기다려주세용... 🤤</p>
          <ReactLoading
            className="Auth-Container-Loading"
            type={"spokes"}
            height={"2.4rem"}
            width={"2.4rem"}
          />
        </div>
      </div>
    </>
  );
};

export default Auth;
