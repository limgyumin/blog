import CategoryStore from "../../stores/Category";
import CommentStore from "../../stores/Comment";
import ModalStore from "../../stores/Modal";
import PostStore from "../../stores/Post";
import UserStore from "../../stores/User";

type StoreType = {
  store: {
    UserStore: UserStore;
    PostStore: PostStore;
    CommentStore: CommentStore;
    CategoryStore: CategoryStore;
    ModalStore: ModalStore;
  };
};

export default StoreType;
