import axios from "axios";
import { SERVER } from "../../config/config.json";

interface PostParamsType {
  page: number;
  limit: number;
  category?: number;
}

class Post {
  async GetPosts(query: PostParamsType) {
    try {
      let url = `${SERVER}/v1/post/?page=${query.page}&limit=${query.limit}`;

      if (query.category) {
        url += `&category=${query.category}`;
      }

      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new Post();
