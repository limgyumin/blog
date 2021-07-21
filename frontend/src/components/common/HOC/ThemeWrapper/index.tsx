import React, { FC } from "react";
import { ThemeProvider } from "styled-components";
import useTheme from "hooks/util/useTheme";
import { themes } from "styles/theme";

type ThemeWrapperProps = {
  children: React.ReactNode;
};

const ThemeWrapper: FC<ThemeWrapperProps> = ({ children }) => {
  const { isLight } = useTheme();

  return (
    <ThemeProvider theme={themes[isLight ? "light" : "dark"]}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
