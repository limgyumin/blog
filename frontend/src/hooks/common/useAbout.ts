import { useEffect, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";

export default function useAbout() {
  const history = useHistory();
  const { pathname } = useLocation();

  const isInfo = useMemo(() => pathname === "/about" || pathname === "/about/info", [pathname]);
  const isPolicy = useMemo(() => pathname === "/about/policy", [pathname]);

  useEffect(() => {
    if (!isInfo && !isPolicy) {
      history.push("/about");
    }
  }, [history, isInfo, isPolicy]);

  return {
    isInfo,
    isPolicy,
  };
}
