import React, { useEffect } from "react";
import { observer } from "mobx-react";
import About from "../../components/About";
import { useHistory, useLocation } from "react-router-dom";

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
      <About isInfo={isInfo} isPolicy={isPolicy} />
    </>
  );
};

export default observer(AboutContainer);
