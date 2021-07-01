import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import useAbout from "hooks/common/useAbout";
import { Link } from "react-router-dom";
import AboutInformation from "./AboutInformation";
import AboutPolicy from "./AboutPolicy";
import ReactHelmet from "components/common/ReactHelmet";
import { THUMBNAIL_URL } from "config/config.json";

const styles = require("./About.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const About = () => {
  const { isPolicy } = useAbout();

  return (
    <React.Fragment>
      <ReactHelmet
        title="About | Nonamed"
        description="개발자를 꿈꾸는 한 학생의 이야기"
        url="https://nonamed.blog/about/info"
        image={THUMBNAIL_URL}
      />
      <div className={cx("about")}>
        <div className={cx("about-wrap")}>
          <h1 className={cx("about-wrap-title")}>About</h1>
          <h4 className={cx("about-wrap-subtitle")}>
            블로그에 대한 설명, 개인정보 처리방침이 표시됩니다.
          </h4>
          <div className={cx("about-wrap-tab")}>
            <div className={cx("about-wrap-tab-container")}>
              <Link
                to="/about"
                className={cx("about-wrap-tab-container-info", { "info-active": !isPolicy })}
              >
                <h2
                  className={cx("about-wrap-tab-container-info-text", {
                    "info-text-active": !isPolicy,
                  })}
                >
                  블로그
                </h2>
              </Link>
              <Link
                to="/about?type=policy"
                className={cx("about-wrap-tab-container-policy", { "policy-active": isPolicy })}
              >
                <h2
                  className={cx("about-wrap-tab-container-policy-text", {
                    "policy-text-active": isPolicy,
                  })}
                >
                  개인정보 처리방침
                </h2>
              </Link>
              <div
                className={cx("about-wrap-tab-container-bottom", { "bottom-active": isPolicy })}
              />
            </div>
          </div>
          <div className={cx("about-wrap-content")}>
            {isPolicy ? <AboutPolicy /> : <AboutInformation />}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default About;
