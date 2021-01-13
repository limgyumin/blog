import React from "react";
import MarkDown from "../../components/Post/MarkDown";

interface MarkDownContainerProps {
  className: string;
  children: string;
  scrollDownRef?: React.RefObject<HTMLDivElement>;
}

const MarkDownContainer = ({
  className,
  children,
  scrollDownRef,
}: MarkDownContainerProps) => {
  return (
    <div className={className} ref={scrollDownRef}>
      <MarkDown>{typeof children === "string" ? children : ""}</MarkDown>
    </div>
  );
};

export default MarkDownContainer;
