import ETheme from "enum/theme.enum";
import { createAction } from "typesafe-actions";

export const CHANGE_THEME = "theme/CHANGE_THEME";

export const changeTheme = createAction(CHANGE_THEME)<ETheme>();
