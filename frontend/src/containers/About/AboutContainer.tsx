import React, { useEffect } from "react";
import { observer } from "mobx-react";
import About from "../../components/About";
import { useHistory, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import ReactHelmet from "../../components/common/ReactHelmet";

const AboutContainer = ({}) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const isInfo = pathname === "/about" || pathname === "/about/info";
  const isPolicy = pathname === "/about/policy";

  useEffect(() => {
    if (!isInfo && !isPolicy) {
      history.push("/about");
    }
  }, [isInfo, isPolicy]);

  return (
    <>
      <ReactHelmet
        title="About | Nonamed"
        description="개발자를 꿈꾸는 한 학생의 이야기"
      />
      <About isInfo={isInfo} isPolicy={isPolicy} />
    </>
  );
};

export default observer(AboutContainer);
