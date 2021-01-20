import { observer } from "mobx-react";
import React, { useCallback } from "react";
import { WiMoonAltNew } from "react-icons/wi";
import { IoMdMoon } from "react-icons/io";
import useStore from "../../../../util/lib/hooks/useStore";
import "./SideBarThemeButton.scss";

interface SideBarThemeButtonProps {}

const SideBarThemeButton = ({}: SideBarThemeButtonProps) => {
  const { store } = useStore();
  const { theme, handleThemeState } = store.ThemeStore;

  const themeChangeHandler = useCallback(() => {
    localStorage.setItem("theme", theme ? "light" : "dark");
    handleThemeState(!theme);
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
        >
          {!theme ? <IoMdMoon /> : <WiMoonAltNew />}
        </div>
      </div>
    </>
  );
};

export default observer(SideBarThemeButton);
