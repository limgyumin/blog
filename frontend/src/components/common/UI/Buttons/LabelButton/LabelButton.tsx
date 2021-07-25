import React from "react";
import styled, { CSSProperties } from "styled-components";

import {
  ButtonColorValue,
  ButtonShapeValue,
  ButtonSizeValue,
} from "../base/types";
import {
  buttonBaseStyle,
  buttonStyleByShape,
  buttonStyleBySize,
  iconStyleBySize,
} from "../base/styles";
import { labelButtonStyleByColor } from "./styles";

type Props = {
  children: React.ReactNode;
  size?: ButtonSizeValue;
  color?: ButtonColorValue;
  shape?: ButtonShapeValue;
  disabled?: boolean;
  icon?: React.ReactNode;
  htmlFor?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

const LabelButton: React.FC<Props> = ({
  children,
  size = "md",
  color = "black",
  shape = "square",
  icon,
  htmlFor,
  style,
  onClick = () => {},
}) => {
  return (
    <StyledLabelButton
      $size={size}
      $color={color}
      $shape={shape}
      htmlFor={htmlFor}
      style={style}
      onClick={onClick}
    >
      {icon}
      {children}
    </StyledLabelButton>
  );
};

type StyledLabelButtonProps = {
  $size: ButtonSizeValue;
  $color: ButtonColorValue;
  $shape: ButtonShapeValue;
};

const StyledLabelButton = styled.label<StyledLabelButtonProps>`
  ${buttonBaseStyle};

  ${(props) => buttonStyleBySize[props.$size]}
  ${(props) => labelButtonStyleByColor[props.$color]}
  ${(props) => buttonStyleByShape[props.$shape]}

  & > svg {
    ${(props) => iconStyleBySize[props.$size]}
    margin-right: 0.5rem;
  }
`;

export default LabelButton;
