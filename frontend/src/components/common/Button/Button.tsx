import React from "react";
import "./Button.scss";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <>
      <button
        className="Button"
        onClick={() => {
          onClick;
        }}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
