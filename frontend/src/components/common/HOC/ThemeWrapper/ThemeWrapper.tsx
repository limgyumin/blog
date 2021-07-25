import React from "react";
import { ThemeProvider } from "styled-components";
import { themes } from "styles/theme";
import useTheme from "hooks/util/useTheme";

type Props = {
  children: React.ReactNode;
};

const ThemeWrapper: React.FC<Props> = ({ children }) => {
  const { isLight } = useTheme();

  return (
    <ThemeProvider theme={themes[isLight ? "light" : "dark"]}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
