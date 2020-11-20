import CategoryStore from "./Category";
import ModalStore from "./Modal";
import PostStore from "./Post";
import UserStore from "./User";

const stores = {
  ModalStore: new ModalStore(),
  PostStore: new PostStore(),
  CategoryStore: new CategoryStore(),
  UserStore: new UserStore(),
};

export default stores;
