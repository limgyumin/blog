import axios from "axios";
import { SERVER } from "../../config/config.json";

class Category {
  async getCategories() {
    try {
      let url = `${SERVER}/v1/category`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new Category();
