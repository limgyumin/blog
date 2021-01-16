import CategoryStore from "./Category";
import CommentStore from "./Comment";
import PostStore from "./Post";
import ReplyStore from "./Reply";
import ThemeStore from "./Theme";
import UploadStore from "./Upload";
import UserStore from "./User";

const stores = {
  PostStore: new PostStore(),
  CommentStore: new CommentStore(),
  ReplyStore: new ReplyStore(),
  CategoryStore: new CategoryStore(),
  UploadStore: new UploadStore(),
  UserStore: new UserStore(),
  ThemeStore: new ThemeStore(),
};

export default stores;
