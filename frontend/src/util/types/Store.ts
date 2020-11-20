import CategoryStore from "../../stores/Category";
import ModalStore from "../../stores/Modal";
import PostStore from "../../stores/Post";
import UserStore from "../../stores/User";

type StoreType = {
  store: {
    UserStore: UserStore;
    PostStore: PostStore;
    CategoryStore: CategoryStore;
    ModalStore: ModalStore;
  };
};

export default StoreType;
