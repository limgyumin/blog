import { action, observable } from "mobx";
import { autobind } from "core-decorators";

@autobind
class LoginStore {
  @observable isShowed: boolean = false;
  @observable isOpen: boolean = false;

  @action
  showModal() {
    if (this.isShowed) {
      setTimeout(() => {
        this.isShowed = !this.isShowed;
      }, 300);
    } else {
      this.isShowed = !this.isShowed;
    }
    this.isOpen = !this.isOpen;
  }
}

export default LoginStore;
