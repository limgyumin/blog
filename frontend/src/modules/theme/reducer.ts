import ETheme from "enum/theme.enum";
import { createReducer } from "typesafe-actions";
import { CHANGE_THEME } from "./actions";
import { ThemeAction, ThemeState } from "./types";

const { LIGHT, DARK } = ETheme;

const getTheme = (): ETheme => {
  const theme = localStorage.getItem("theme");

  return theme === DARK ? DARK : LIGHT;
};

const initialState: ThemeState = {
  theme: getTheme(),
};

const themes = createReducer<ThemeState, ThemeAction>(initialState, {
  [CHANGE_THEME]: (state, action) => ({
    ...state,
    theme: action.payload,
  }),
});

export default themes;
