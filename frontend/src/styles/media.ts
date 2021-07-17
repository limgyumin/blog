import { css, CSSProp } from "styled-components";

export const sizes: { [key: string]: number } = {
  mobile: 580,
  tablet: 768,
  desktop: 1284,
};

type BackQuoteArgs = string[];

export type Media = {
  mobile: (
    literals: TemplateStringsArray,
    ...args: BackQuoteArgs
  ) => CSSProp | undefined;
  tablet: (
    literals: TemplateStringsArray,
    ...args: BackQuoteArgs
  ) => CSSProp | undefined;
  desktop: (
    literals: TemplateStringsArray,
    ...args: BackQuoteArgs
  ) => CSSProp | undefined;
};

const media: Media = {
  mobile: (literals: TemplateStringsArray, ...args: BackQuoteArgs) => undefined,
  tablet: (literals: TemplateStringsArray, ...args: BackQuoteArgs) => undefined,
  desktop: (literals: TemplateStringsArray, ...args: BackQuoteArgs) =>
    undefined,
};

Object.keys(sizes).forEach((label: string) => {
  media[label] = (literals: TemplateStringsArray, ...args: BackQuoteArgs) =>
    css`
      @media only screen and (max-width: ${sizes[label]}px) {
        ${css(literals, ...args)}
      }
    `;
});

export default media;
