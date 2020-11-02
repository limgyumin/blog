import axios from "axios";
import { SERVER } from "../../config/config.json";

class Post {
  async GetPosts(categoryIdx?: number) {
    try {
      let url = `${SERVER}/v1/post`;

      if (categoryIdx) {
        url += `?category=${categoryIdx}`;
      }

      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new Post();
