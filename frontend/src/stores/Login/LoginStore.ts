import { action, observable } from "mobx";
import { autobind } from "core-decorators";

@autobind
class LoginStore {
  @observable isShowed: boolean = false;

  @action
  showModal() {
    this.isShowed = !this.isShowed;
    console.log(this.isShowed);
  }
}

export default LoginStore;
