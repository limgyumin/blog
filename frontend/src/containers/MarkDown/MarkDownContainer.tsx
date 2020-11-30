import React from "react";
import MarkDown from "../../components/Post/MarkDown";

interface MarkDownContainerProps {
  className: string;
  children: string;
}

const MarkDownContainer = ({ className, children }: MarkDownContainerProps) => {
  return (
    <div className={className}>
      <MarkDown>{typeof children === "string" ? children : ""}</MarkDown>
    </div>
  );
};

export default MarkDownContainer;
