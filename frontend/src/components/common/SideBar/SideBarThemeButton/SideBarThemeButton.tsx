import { observer } from "mobx-react";
import React, { useCallback } from "react";
import useStore from "../../../../util/lib/hooks/useStore";
import "./SideBarThemeButton.scss";

interface SideBarThemeButtonProps {}

const SideBarThemeButton = ({}: SideBarThemeButtonProps) => {
  const { store } = useStore();
  const { theme, handleThemeState } = store.ThemeStore;

  const themeChangeHandler = useCallback(() => {
    if (!theme) {
      handleThemeState(true);
      localStorage.setItem("theme", "dark");
    } else {
      handleThemeState(false);
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <>
      <div
        className="Side-Bar-Theme-Button"
        onClick={() => themeChangeHandler()}
      >
        <div
          className={
            !theme
              ? "Side-Bar-Theme-Button-Toggle"
              : "Side-Bar-Theme-Button-Toggle-Dark Side-Bar-Theme-Button-Toggle"
          }
        />
      </div>
    </>
  );
};

export default observer(SideBarThemeButton);
