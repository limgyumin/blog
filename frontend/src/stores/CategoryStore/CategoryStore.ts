import { action, observable } from "mobx";
import { autobind } from "core-decorators";
import Category from "../../assets/api/Category";

interface CategoryResponseType {
  status: number;
  message: string;
  data: {
    total: number;
    categories: CategoryType[];
  };
}

interface CategoryType {
  idx: number;
  name: string;
  order_number: number;
  post_count: number;
}

@autobind
class CategoryStore {
  @observable categories: CategoryType[] = [];
  @observable totalPostCount: number = 0;

  @action
  handleCategories = async (): Promise<CategoryResponseType> => {
    try {
      const response: CategoryResponseType = await Category.getCategories();

      this.categories = response.data.categories;
      this.totalPostCount = response.data.total;

      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(new Error(`${error}`));
      });
    }
  };
}

export default CategoryStore;
