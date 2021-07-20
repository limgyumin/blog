import { css } from "styled-components";

export const ellipsis = (lineCount: number) => {
  return css`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${lineCount};
    -webkit-box-orient: vertical;
    word-wrap: break-word;
  `;
};
