import ETheme from "enum/theme.enum";
import { RootState } from "modules";
import { changeTheme } from "modules/theme";
import { useMemo } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const useTheme = () => {
  const { theme } = useSelector((state: RootState) => state.themes);

  const dispatch = useDispatch();

  const { LIGHT, DARK } = ETheme;

  const isLight = useMemo(() => LIGHT === theme, [LIGHT, theme]);

  const onChangeTheme = useCallback(() => {
    if (theme === LIGHT) {
      localStorage.setItem("theme", DARK);
      dispatch(changeTheme(DARK));
      return;
    }

    localStorage.setItem("theme", LIGHT);
    dispatch(changeTheme(LIGHT));
  }, [LIGHT, DARK, theme, dispatch]);

  return {
    isLight,
    theme,
    onChangeTheme,
  };
};

export default useTheme;
