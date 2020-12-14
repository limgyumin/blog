import axios from "axios";
import { SERVER } from "../../config/config.json";

interface PostParamsType {
  page: number;
  limit: number;
  category?: number;
}

class Post {
  async CreatePost(
    title: string,
    description: string,
    content: string,
    category_idx: number,
    thumbnail?: string
  ) {
    try {
      const url = `${SERVER}/v1/post`;

      const body = {
        title,
        description,
        content,
        thumbnail: thumbnail || null,
        category_idx,
      };

      const { data } = await axios.post(url, body);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async GetPosts(query: PostParamsType) {
    try {
      let url = `${SERVER}/v1/post?page=${query.page}&limit=${query.limit}`;

      if (query.category) {
        url += `&category=${query.category}`;
      }

      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async GetPost(idx: number) {
    try {
      const url = `${SERVER}/v1/post/${idx}`;

      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async DeletePost(idx: number) {
    try {
      const url = `${SERVER}/v1/post/${idx}`;

      const { data } = await axios.delete(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async GetOtherPosts(idx: number) {
    try {
      const url = `${SERVER}/v1/post/other/${idx}`;

      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async PostLike(post_idx: number) {
    try {
      const url = `${SERVER}/v1/like`;
      const body = {
        post_idx,
      };

      const { data } = await axios.post(url, body);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async GetLikeInfo(idx: number) {
    try {
      const url = `${SERVER}/v1/like/${idx}`;

      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new Post();
