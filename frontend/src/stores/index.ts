import CategoryStore from "./CategoryStore";
import PostStore from "./PostStore";

const stores = {
  PostStore: new PostStore(),
  CategoryStore: new CategoryStore(),
};

export default stores;
