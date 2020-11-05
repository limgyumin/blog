import CategoryStore from "./Category";
import LoginStore from "./Login";
import PostStore from "./Post";

const stores = {
  LoginStore: new LoginStore(),
  PostStore: new PostStore(),
  CategoryStore: new CategoryStore(),
};

export default stores;
