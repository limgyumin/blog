import React from "react";
import "./Login.scss";
import person from "../../assets/images/person.svg";
import facebook from "../../assets/images/facebook.svg";
import instagram from "../../assets/images/instagram.svg";
import github from "../../assets/images/github.svg";
import github_logo from "../../assets/images/github_logo.svg";
import { FACEBOOK, INSTAGRAM, GITHUB } from "../../config/config.json";

interface LoginProps {}

const Login = ({}: LoginProps) => {
  return (
    <>
      <div className="Login">
        <div className="Login-Image">
          <img src={person} alt={person} />
        </div>
        <div className="Login-Container">
          <div className="Login-Container-Content">
            <p className="Login-Container-Content-Title">환영합니다!</p>
            <p className="Login-Container-Content-Description">
              Untitled는 대구소프트웨어고등학교에 재학중인 저 임규민의 개인
              블로그로, 개발에 대한 다양한 지식 및 제 일상을 여러분께 공유하고
              소통하기 위해 만들어진 저만의 작은 공간입니다.
            </p>
            <p className="Login-Container-Content-Subtitle">
              저와 소통하고 싶으시다면... 😏
            </p>
            <div className="Login-Container-Content-SNS">
              <a href={FACEBOOK}>
                <img src={facebook} alt={facebook} />
              </a>
              <a href={INSTAGRAM}>
                <img src={instagram} alt={instagram} />
              </a>
              <a href={GITHUB}>
                <img src={github} alt={github} />
              </a>
            </div>
          </div>
          <button className="Login-Container-Content-Button" onClick={() => {}}>
            <img src={github_logo} alt={github_logo} />
            GitHub로 로그인
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
