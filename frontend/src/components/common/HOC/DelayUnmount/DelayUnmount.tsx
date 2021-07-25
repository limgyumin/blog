import React, { useEffect, useState } from "react";
import Portal from "../Portal/Portal";
import usePrevious from "hooks/util/usePrevious";

type Props = {
  children: React.ReactNode;
  isMount: boolean;
  delay: number;
};

const DelayUnmount: React.FC<Props> = ({ isMount, children, delay }) => {
  const [shouldRender, setShouldRender] = useState<boolean>(false);

  const prevIsMount = usePrevious<boolean>(isMount);

  useEffect(() => {
    if (prevIsMount && !isMount) {
      setTimeout(() => {
        setShouldRender(false);
      }, delay);
    } else if (!prevIsMount && isMount) {
      setShouldRender(true);
    }
  }, [prevIsMount, isMount, delay, setShouldRender]);

  return shouldRender ? <Portal>{children}</Portal> : null;
};

export default DelayUnmount;
