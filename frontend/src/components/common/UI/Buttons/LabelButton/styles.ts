import { darken, lighten } from "polished";
import { css } from "styled-components";
import { ButtonColor } from "../base/types";

export const labelButtonStyleByColor: { [key in ButtonColor] } = {
  [ButtonColor.BLACK]: css`
    background-color: ${({ theme }) => theme.color.ftColor};
    color: ${({ theme }) => theme.color.bgColor};

    &:hover {
      background-color: ${({ theme }) => lighten(0.15, theme.color.ftColor)};
    }
  `,
  [ButtonColor.GRAY]: css`
    background-color: ${({ theme }) => theme.color.ftColor4};
    color: ${({ theme }) => theme.color.bgColor};

    &:hover {
      background-color: ${({ theme }) => lighten(0.15, theme.color.ftColor4)};
    }
  `,
  [ButtonColor.LIGHTGRAY]: css`
    background-color: ${({ theme }) => theme.color.bgColor5};
    color: ${({ theme }) => theme.color.ftColor};

    &:hover {
      background-color: ${({ theme }) => darken(0.05, theme.color.bgColor5)};
    }
  `,
};
