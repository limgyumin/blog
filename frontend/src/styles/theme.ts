import media, { Media } from "./media";

type BaseColors = {
  bgColor: string;
  bgColor1: string;
  bgColor2: string;
  bgColor3: string;
  bgColor4: string;
  bgColor5: string;

  ftColor: string;
  ftColor1: string;
  ftColor2: string;
  ftColor3: string;
  ftColor4: string;
  ftColor5: string;

  bdColor: string;
  ldColor: string;
  ldColor1: string;
  icBlue: string;
  icBlue1: string;
  olColor: string;
};

const lightColors: BaseColors = {
  bgColor: "#ffffff",
  bgColor1: "#c1c1c1",
  bgColor2: "#f5f5f5",
  bgColor3: "#fbfbfb",
  bgColor4: "#f8f8f8",
  bgColor5: "#d8d8d8",

  ftColor: "#1e1e1e",
  ftColor1: "#292929",
  ftColor2: "#3e3e3e",
  ftColor3: "#5e5e5e",
  ftColor4: "#6e6e6e",
  ftColor5: "#a2a2a2",

  bdColor: "#ececec",
  ldColor: "#f7f7f7",
  ldColor1: "#ececec",
  icBlue: "#58a6ff",
  icBlue1: "#0366d6",
  olColor: "#ffffffcc",
};

const darkColors: BaseColors = {
  bgColor: "#202020",
  bgColor1: "#575757",
  bgColor2: "#272727",
  bgColor3: "#222222",
  bgColor4: "#202020",
  bgColor5: "#383838",

  ftColor: "#dddddd",
  ftColor1: "#c7c7c7",
  ftColor2: "#b3b3b3",
  ftColor3: "#999999",
  ftColor4: "#727272",
  ftColor5: "#686868",

  bdColor: "#2e2e2e",
  ldColor: "#292929",
  ldColor1: "#252525",
  icBlue: "#58a6ff",
  icBlue1: "#0366d6",
  olColor: "#00000066",
};

const defaultTheme = {
  media,
};

const lightTheme = {
  color: lightColors,
  ...defaultTheme,
};

const darkTheme = {
  color: darkColors,
  ...defaultTheme,
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export type Theme = {
  color: BaseColors;
  media: Media;
};
