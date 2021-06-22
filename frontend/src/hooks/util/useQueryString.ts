import { useLocation } from "react-router";

const useQueryString = (target: string): string => {
  const { search } = useLocation();

  const params = new URLSearchParams(search);

  return params.get(target) as string;
};

export default useQueryString;
