import CategoryStore from "../../stores/Category";
import CommentStore from "../../stores/Comment";
import PostStore from "../../stores/Post";
import ReplyStore from "../../stores/Reply";
import UserStore from "../../stores/User";

type StoreType = {
  store: {
    UserStore: UserStore;
    PostStore: PostStore;
    CommentStore: CommentStore;
    ReplyStore: ReplyStore;
    CategoryStore: CategoryStore;
  };
};

export default StoreType;
