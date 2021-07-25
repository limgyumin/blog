import { css } from "styled-components";
import { darken, lighten } from "polished";
import { ButtonColor, ButtonShape, ButtonSize } from "./types";

export const buttonBaseStyle = css`
  width: auto;
  border: none;
  outline: none;
  transition: background-color ease 0.1s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const buttonStyleBySize: { [key in ButtonSize] } = {
  [ButtonSize.SMALL]: css`
    font-size: 0.875rem;
    font-weight: bold;
    padding: 0.4rem 0.7rem;
  `,
  [ButtonSize.MEDIUM]: css`
    font-size: 0.925rem;
    font-weight: bold;
    padding: 0.33rem 1rem;
  `,
  [ButtonSize.LARGE]: css`
    font-size: 1.125rem;
    font-weight: bold;
    padding: 0.4rem 1rem;
  `,
};

export const iconStyleBySize: { [key in ButtonSize] } = {
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

export const buttonStyleByColor: { [key in ButtonColor] } = {
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
      background-color: ${({ theme }) => lighten(0.05, theme.color.bgColor5)};
    }
  `,
};

export const buttonStyleByShape: { [key in ButtonShape] } = {
  [ButtonShape.SQUARE]: css`
    border-radius: 0.2rem;
  `,
  [ButtonShape.ROUND]: css`
    border-radius: 3rem;
  `,
};
