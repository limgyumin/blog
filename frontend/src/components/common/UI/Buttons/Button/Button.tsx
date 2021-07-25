import React from "react";
import styled, { CSSProperties } from "styled-components";

import {
  ButtonColorValue,
  ButtonShapeValue,
  ButtonSizeValue,
} from "../base/types";
import {
  buttonBaseStyle,
  buttonStyleByColor,
  buttonStyleByShape,
  buttonStyleBySize,
  iconStyleBySize,
} from "../base/styles";

type Props = {
  children: React.ReactNode;
  size?: ButtonSizeValue;
  color?: ButtonColorValue;
  shape?: ButtonShapeValue;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
};

const Button: React.FC<Props> = ({
  children,
  size = "md",
  color = "black",
  shape = "square",
  disabled = false,
  icon,
  style,
  onClick = () => {},
}) => {
  return (
    <StyledButton
      $size={size}
      $color={color}
      $shape={shape}
      disabled={disabled}
      style={style}
      onClick={onClick}
    >
      {icon}
      {children}
    </StyledButton>
  );
};

type StyledButtonProps = {
  $size: ButtonSizeValue;
  $color: ButtonColorValue;
  $shape: ButtonShapeValue;
};

const StyledButton = styled.button<StyledButtonProps>`
  ${buttonBaseStyle};

  ${(props) => buttonStyleBySize[props.$size]}
  ${(props) => buttonStyleByColor[props.$color]}
  ${(props) => buttonStyleByShape[props.$shape]}

  & > svg {
    ${(props) => iconStyleBySize[props.$size]}
    margin-right: 0.5rem;
  }
`;

export default Button;
