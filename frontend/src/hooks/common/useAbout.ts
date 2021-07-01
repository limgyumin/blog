import useQueryString from "hooks/util/useQueryString";
import { useMemo } from "react";

export default function useAbout() {
  const type = useQueryString("type");

  const isPolicy = useMemo(() => type === "policy", [type]);

  return {
    isPolicy,
  };
}
