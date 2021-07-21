import usePrevious from "hooks/util/usePrevious";
import React, { FC, useEffect, useState } from "react";
import Portal from "../Portal";

type DelayUnmountProps = {
  children: React.ReactNode;
  isMount: boolean;
  delay: number;
};

const DelayUnmount: FC<DelayUnmountProps> = ({ isMount, children, delay }) => {
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
