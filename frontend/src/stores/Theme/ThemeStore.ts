import { autobind } from "core-decorators";
import { action, observable } from "mobx";

@autobind
class ThemeStore {
  @observable theme: boolean = false;

  @action
  handleThemeState = (theme: boolean) => {
    this.theme = theme;
  };
}

export default ThemeStore;
