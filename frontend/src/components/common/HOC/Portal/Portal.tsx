import React from "react";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
};

const Portal: React.FC<Props> = ({ children }) => {
  const element = document.getElementById("modal-root");
  return createPortal(children, element!);
};

export default Portal;
