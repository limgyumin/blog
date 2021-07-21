import React, { FC } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  children: React.ReactNode;
};

const Portal: FC<PortalProps> = ({ children }) => {
  const element = document.getElementById("modal-root");
  return createPortal(children, element!);
};

export default Portal;
