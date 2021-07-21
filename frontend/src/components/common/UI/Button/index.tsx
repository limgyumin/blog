import React from "react";
import { darken, lighten } from "polished";
import { FC } from "react";
import styled, { css } from "styled-components";
import {
  ButtonColor,
  ButtonColorValue,
  ButtonShape,
  ButtonShapeValue,
  ButtonSize,
  ButtonSizeValue,
} from "./types";

type ButtonProps = {
  children: React.ReactNode;
  size?: ButtonSizeValue;
  color?: ButtonColorValue;
  shape?: ButtonShapeValue;
  disabled?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
};

const Button: FC<ButtonProps> = ({
  children,
  size = "md",
  color = "black",
  shape = "square",
  disabled = false,
  icon,
  onClick = () => {},
}) => {
  return (
    <StyledButton
      $size={size}
      $color={color}
      $shape={shape}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
      {children}
    </StyledButton>
  );
};

const buttonBaseStyle = css`
  width: auto;
  border: none;
  outline: none;
  transition: background-color ease 0.1s;
  cursor: pointer;
  padding: 0.33rem 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const buttonStyleBySize: { [key in ButtonSize] } = {
  [ButtonSize.SMALL]: css`
    font-size: 0.725rem;
    font-weight: bold;
  `,
  [ButtonSize.MEDIUM]: css`
    font-size: 0.925rem;
    font-weight: bold;
  `,
  [ButtonSize.LARGE]: css`
    font-size: 1.125rem;
    font-weight: bold;
  `,
};

const iconStyleBySize: { [key in ButtonSize] } = {
  [ButtonSize.SMALL]: css`
    font-size: 1.2rem;
  `,
  [ButtonSize.MEDIUM]: css`
    font-size: 1.4rem;
  `,
  [ButtonSize.LARGE]: css`
    font-size: 1.7rem;
  `,
};

const buttonStyleByColor: { [key in ButtonColor] } = {
  [ButtonColor.BLACK]: css`
    background-color: ${({ theme }) => theme.color.ftColor};
    color: ${({ theme }) => theme.color.bgColor};

    &:not(:disabled):hover {
      background-color: ${({ theme }) => lighten(0.15, theme.color.ftColor)};
    }

    &:disabled {
      cursor: default;
      color: ${({ theme }) => darken(0.05, theme.color.bgColor)};
      background-color: ${({ theme }) => lighten(0.3, theme.color.ftColor)};
    }
  `,
  [ButtonColor.GRAY]: css`
    background-color: ${({ theme }) => theme.color.ftColor4};
    color: ${({ theme }) => theme.color.bgColor};

    &:not(:disabled):hover {
      background-color: ${({ theme }) => lighten(0.15, theme.color.ftColor4)};
    }

    &:disabled {
      cursor: default;
      color: ${({ theme }) => darken(0.05, theme.color.bgColor)};
      background-color: ${({ theme }) => lighten(0.2, theme.color.ftColor4)};
    }
  `,
  [ButtonColor.LIGHTGRAY]: css`
    background-color: ${({ theme }) => theme.color.bgColor5};
    color: ${({ theme }) => theme.color.ftColor};

    &:not(:disabled):hover {
      background-color: ${({ theme }) => darken(0.05, theme.color.bgColor5)};
    }

    &:disabled {
      cursor: default;
      color: ${({ theme }) => lighten(0.4, theme.color.ftColor)};
      background-color: ${({ theme }) => lighten(0.1, theme.color.bgColor5)};
    }
  `,
};

const buttonStyleByShape: { [key in ButtonShape] } = {
  [ButtonShape.SQUARE]: css`
    border-radius: 0.2rem;
  `,
  [ButtonShape.ROUND]: css`
    border-radius: 3rem;
  `,
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
