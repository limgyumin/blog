import axios from "axios";
import { SERVER } from "../../config/config.json";

class Category {
  async createCategory(name: string) {
    try {
      const url = `${SERVER}/v1/category`;

      const body = {
        name,
      };

      const { data } = await axios.post(url, body);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async getCategories() {
    try {
      const url = `${SERVER}/v1/category`;

      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async getCategoryPosts() {
    try {
      const url = `${SERVER}/v1/category/post`;

      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async deleteCategory(idx: number) {
    try {
      const url = `${SERVER}/v1/category/${idx}`;

      const { data } = await axios.delete(url);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new Category();
