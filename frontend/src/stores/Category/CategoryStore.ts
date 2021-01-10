import { action, observable } from "mobx";
import { autobind } from "core-decorators";
import Category from "../../assets/api/Category";
import { CategoryType, CategoryPostsType } from "../../util/types/Category";
import {
  CategoriesResponse,
  CategoryPostsResponse,
} from "../../util/types/Response";

@autobind
class CategoryStore {
  @observable categories: CategoryType[] = [];
  @observable categoryPosts: CategoryPostsType[] = [];
  @observable totalPostCount: number = 0;

  @action
  handleCreateCategory = async (name: string): Promise<Response> => {
    try {
      const response: Response = await Category.createCategory(name);

      return new Promise((resolve: (response: Response) => void, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

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
        reject(error);
      });
    }
  };

  @action
  handleCategoryPosts = async (): Promise<CategoryPostsResponse> => {
    try {
      const response: CategoryPostsResponse = await Category.getCategoryPosts();

      this.categoryPosts = response.data.categories;

      return new Promise(
        (resolve: (response: CategoryPostsResponse) => void, reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      return new Promise((resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action
  handleDeleteCategory = async (idx: number): Promise<Response> => {
    try {
      const response: Response = await Category.deleteCategory(idx);

      return new Promise((resolve: (response: Response) => void, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };
}

export default CategoryStore;
