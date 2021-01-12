import axios from "axios";
import { SERVER } from "../../config/config.json";

class Category {
  async CreateCategory(name: string) {
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

  async GetCategories() {
    try {
      const url = `${SERVER}/v1/category`;

      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async GetCategoryPosts() {
    try {
      const url = `${SERVER}/v1/category/post`;

      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async ModifyCategory(idx: number, name: string) {
    try {
      const url = `${SERVER}/v1/category/${idx}`;

      const body = {
        name,
      };

      const { data } = await axios.put(url, body);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async DeleteCategory(idx: number) {
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
