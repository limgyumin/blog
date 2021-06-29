import { useCallback, useEffect, useState } from "react";

const useModal = () => {
  const [isMount, setIsMount] = useState<boolean>(false);

  const handleModalMount = useCallback((): void => {
    setIsMount(!isMount);
  }, [isMount]);

  useEffect(() => {
    isMount ? (document.body.style.overflow = "hidden") : (document.body.style.overflow = "unset");
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMount]);

  useEffect(() => {
    return () => setIsMount(false);
  }, []);

  return {
    isMount,
    handleModalMount,
  };
};

export default useModal;
