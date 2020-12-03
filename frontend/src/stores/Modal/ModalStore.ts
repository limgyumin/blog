import { action, observable } from "mobx";
import { autobind } from "core-decorators";

@autobind
class ModalStore {
  @observable show: boolean = false;
  @observable open: boolean = false;

  @action
  showModal() {
    if (this.show) {
      setTimeout(() => {
        this.show = !this.show;
      }, 500);
    } else {
      this.show = !this.show;
    }
    this.open = !this.open;
  }
}

export default ModalStore;
