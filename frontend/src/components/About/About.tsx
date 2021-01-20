import React from "react";
import { Link } from "react-router-dom";
import "./About.scss";
import AboutInformation from "./AboutInformation";
import AboutPolicy from "./AboutPolicy";

interface AboutProps {
  isInfo: boolean;
  isPolicy: boolean;
}

const About = ({ isInfo, isPolicy }: AboutProps) => {
  return (
    <>
      <div className="About">
        <div className="About-Container">
          <h1 className="About-Container-Title">About</h1>
          <h4 className="About-Container-Subtitle">
            블로그에 대한 설명, 개인정보 처리방침이 표시됩니다.
          </h4>
          <div className="About-Container-Tab">
            <div className="About-Container-Tab-Wrapper">
              <Link
                to="/about/info"
                className={
                  isInfo
                    ? "About-Container-Tab-Wrapper-Info-Active About-Container-Tab-Wrapper-Info"
                    : "About-Container-Tab-Wrapper-Info"
                }
              >
                <h2
                  className={
                    isInfo
                      ? "About-Container-Tab-Wrapper-Info-Text-Active About-Container-Tab-Wrapper-Info-Text"
                      : "About-Container-Tab-Wrapper-Info-Text"
                  }
                >
                  블로그
                </h2>
              </Link>
              <Link
                to="/about/policy"
                className={
                  isPolicy
                    ? "About-Container-Tab-Wrapper-Policy-Active About-Container-Tab-Wrapper-Policy"
                    : "About-Container-Tab-Wrapper-Policy"
                }
              >
                <h2
                  className={
                    isPolicy
                      ? "About-Container-Tab-Wrapper-Policy-Text-Active About-Container-Tab-Wrapper-Policy-Text"
                      : "About-Container-Tab-Wrapper-Policy-Text"
                  }
                >
                  개인정보 처리방침
                </h2>
              </Link>
              <div
                className={
                  !isPolicy
                    ? "About-Container-Tab-Wrapper-Bottom"
                    : "About-Container-Tab-Wrapper-Bottom-Active About-Container-Tab-Wrapper-Bottom"
                }
              />
            </div>
          </div>
          <div className="About-Container-Content">
            {isInfo && <AboutInformation />}
            {isPolicy && <AboutPolicy />}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
