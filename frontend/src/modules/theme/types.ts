import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import ETheme from "enum/theme.enum";

export type ThemeAction = ActionType<typeof actions>;

export type ThemeState = {
  theme: ETheme;
};
