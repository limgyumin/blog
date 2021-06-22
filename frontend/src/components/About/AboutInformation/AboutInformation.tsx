import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import MarkDown from "components/common/MarkDown";

const styles = require("./AboutInformation.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const AboutInformation = () => {
  return (
    <div className={cx("about-information")}>
      <MarkDown className={cx("about-information-content")}>
        {"## 이 블로그는?\n이 블로그는 `프론트엔드 개발자를 꿈꾸는` 대구소프트웨어고등학교에 재학중인 한 학생이 " +
          "`자신의 개발 지식`과 `새로 알게되었거나 관심있는 기술에 대한 정보`를 공유하고 기록하는 곳입니다." +
          "\n\n> 블로그 개발에 대해 궁금하시다면?  [GitHub Repository](https://github.com/limgyumin/blog)"}
      </MarkDown>
    </div>
  );
};

export default AboutInformation;
