import { action, observable } from "mobx";
import { autobind } from "core-decorators";
import Category from "../../assets/api/Category";
import { CategoryType } from "../../util/types/Category";
import { CategoriesResponse } from "../../util/types/Response";

@autobind
class CategoryStore {
  @observable categories: CategoryType[] = [];
  @observable totalPostCount: number = 0;

  @action
  handleCategories = async (): Promise<CategoriesResponse> => {
    try {
      const response: CategoriesResponse = await Category.getCategories();

      this.categories = response.data.categories;
      this.totalPostCount = response.data.total;

      return new Promise(
        (resolve: (response: CategoriesResponse) => void, reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      return new Promise((resolve, reject: (error: Error) => void) => {
        reject(new Error(`${error}`));
      });
    }
  };
}

export default CategoryStore;
