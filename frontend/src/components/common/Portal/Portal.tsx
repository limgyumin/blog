import React from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode;
  elementId: string;
}

const Portal = ({ children, elementId }: PortalProps) => {
  const element = document.getElementById(elementId);
  return createPortal(children, element!);
};

export default Portal;
