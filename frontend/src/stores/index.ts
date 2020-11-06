import CategoryStore from "./Category";
import LoginStore from "./Login";
import PostStore from "./Post";
import UserStore from "./User";

const stores = {
  LoginStore: new LoginStore(),
  PostStore: new PostStore(),
  CategoryStore: new CategoryStore(),
  UserStore: new UserStore(),
};

export default stores;
